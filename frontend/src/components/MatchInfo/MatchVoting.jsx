"use client";

import { useState, useEffect } from "react";
import { Button, Typography, message } from "antd";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

import apiClient from "../../utils/apiClient";
import useVoteAggregate from "../../hooks/useGetVoteAggregate";
import useCreateVote from "../../hooks/useCreateVote";
import useCheckIfVoted from "../../hooks/useCheckIfVoted";

const { Text } = Typography;

/**
 * Računa postotke iz (homeCount, drawCount, awayCount).
 */
function computePercentages(homeCount, drawCount, awayCount) {
  const total = homeCount + drawCount + awayCount;
  if (!total) {
    return { homePct: 33.3, drawPct: 33.3, awayPct: 33.3, total: 0 };
  }
  return {
    homePct: (homeCount / total) * 100,
    drawPct: (drawCount / total) * 100,
    awayPct: (awayCount / total) * 100,
    total,
  };
}

function VotingOptions({ onVote }) {
  return (
    <div className="bg-white shadow-md rounded-3xl overflow-hidden p-4 my-4">
      <div className="text-center mb-2">
        <Text strong className="text-base sm:text-lg">
          Glasaj za pobjednika
        </Text>
      </div>
      <div className="flex items-center justify-center mb-4 space-x-4">
        <Button onClick={() => onVote("HOME")}>1</Button>
        <Button onClick={() => onVote("DRAW")}>X</Button>
        <Button onClick={() => onVote("AWAY")}>2</Button>
      </div>
    </div>
  );
}

function VotingResults({ homeCount, drawCount, awayCount }) {
  const { homePct, drawPct, awayPct, total } = computePercentages(
    homeCount,
    drawCount,
    awayCount
  );

  return (
    <div className="bg-white shadow-md rounded-3xl overflow-hidden p-4 my-4">
      <div className="flex justify-between mb-1">
        <Text>{homePct.toFixed(0)}%</Text>
        <Text>{drawPct.toFixed(0)}%</Text>
        <Text>{awayPct.toFixed(0)}%</Text>
      </div>

      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
        <div
          className="bg-blue-500 transition-all duration-500"
          style={{ width: `${homePct}%` }}
        />
        <div
          className="bg-yellow-400 transition-all duration-500"
          style={{ width: `${drawPct}%` }}
        />
        <div
          className="bg-red-500 transition-all duration-500"
          style={{ width: `${awayPct}%` }}
        />
      </div>

      <div className="text-center mt-2 text-sm">
        <Text>
          Ukupno glasova: <strong>{total}</strong>
        </Text>
      </div>
    </div>
  );
}

function getOrCreateVoterId() {
  let voterId = Cookies.get("voterId");
  if (!voterId) {
    voterId = uuidv4();
    Cookies.set("voterId", voterId, { expires: 30 }); // npr. 30 dana
  }
  return voterId;
}

export default function MatchVoting({ matchInfo }) {
  // 1) Dovuci/generiraj voterId iz kolačića
  const [voterId, setVoterId] = useState(null);

  useEffect(() => {
    setVoterId(getOrCreateVoterId());
  }, []);

  // 2) Provjeri je li user glasao (hook na top-level, ne unutar useEffect!)
  //    `useCheckIfVoted` tipično vraća npr. { hasVoted: boolean } ili grešku
  const {
    data: votedData,
    isLoading: isVotedLoading,
    isError: isVotedError,
    error: votedError,
  } = useCheckIfVoted(matchInfo.id, voterId);

  // 3) Dohvati agregat: { homeCount, drawCount, awayCount }
  const {
    data: voteData,
    isLoading: isAggregateLoading,
    isError: isAggregateError,
    error: aggregateError,
  } = useVoteAggregate(matchInfo.id);

  // 4) Hook za POST glasanja
  const createVote = useCreateVote(matchInfo.id);

  const handleVote = async (outcome) => {
    // Ako su podaci s backenda rekli da je vec glasao
    if (votedData?.hasVoted) return;

    try {
      await createVote.mutateAsync({ outcome, voterId });
      message.success("Glas je zabilježen!");
      // Ovako automatski invalidira i useCheckIfVoted i useVoteAggregate
      // ako si to postavio u onSuccess:
      //   queryClient.invalidateQueries(['checkIfVoted', matchInfo.id, voterId]);
      //   queryClient.invalidateQueries(['voteAggregate', matchInfo.id]);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        message.error("Već si glasao za ovaj meč!");
      } else {
        message.error("Greška pri glasanju!");
      }
    }
  };

  // Dok se loadaju obje stvari: "jesmo li glasali" i agregat
  if (!voterId || isVotedLoading || isAggregateLoading) {
    return <div>Učitavanje...</div>;
  }

  // Ako se desila greška u "checkIfVoted"
  if (isVotedError) {
    return <div>Greška provjere glasanja: {votedError.message}</div>;
  }
  // Ako se desila greška u dohvaćanju agregata
  if (isAggregateError) {
    return <div>Greška dohvaćanja glasova: {aggregateError.message}</div>;
  }

  // Ako user NIJE glasao, prikaži gumbe
  if (!votedData?.hasVoted) {
    return <VotingOptions onVote={handleVote} />;
  }

  // Ako je glasao, prikaži rezultate
  const { homeCount, drawCount, awayCount } = voteData;
  return (
    <VotingResults
      homeCount={homeCount}
      drawCount={drawCount}
      awayCount={awayCount}
    />
  );
}
