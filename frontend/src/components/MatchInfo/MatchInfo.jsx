import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetMatchInfo } from "../../hooks/useGetMatchInfo";
import { useGetMatchEvents } from "../../hooks/useGetMatchEvents";
import { useGetMatchLineups } from "../../hooks/useGetMatchLineups";
import { useGetMatchReferees } from "../../hooks/useGetMatchReferees";
import { useGetCometImage } from "../../hooks/useGetCometImage";
import TeamInfo from "./TeamInfo";
import RefereeInfo from "./RefereeInfo";
import MatchDetails from "./MatchDetails/MatchDetails";
import { Spin } from "antd";
import MatchVoting from "./MatchVoting";

export default function MatchInfo() {
  const { matchId } = useParams();
  const [moslavacIsHome, setMoslavacIsHome] = useState(false);

  const { data: matchInfo, error: matchInfoError } = useGetMatchInfo(matchId);
  const { data: matchEvents } = useGetMatchEvents(matchId);
  const { data: matchLineups } = useGetMatchLineups(matchId);
  const { data: matchReferees } = useGetMatchReferees(matchId);

  const homeTeamImage = useGetCometImage(matchInfo?.homeTeam?.picture);
  const awayTeamImage = useGetCometImage(matchInfo?.awayTeam?.picture);

  useEffect(() => {
    if (matchInfo) {
      setMoslavacIsHome(matchInfo.homeTeam.name === "SNK Moslavac");
    }
  }, [matchInfo]);

  if (
    matchInfoError ||
    !matchInfo ||
    !matchEvents ||
    !matchLineups ||
    !matchReferees
  ) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  const {
    homeTeam,
    awayTeam,
    dateTimeUTC,
    round,
    competition,
    homeTeamResult,
    awayTeamResult,
  } = matchInfo;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Floating Card Header */}
      <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white p-6 sm:p-8 rounded-t-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <span className="text-sm font-medium opacity-90">
              {new Date(dateTimeUTC).toLocaleDateString()}
            </span>
            <span className="text-sm font-semibold tracking-wider uppercase">
              Kolo {round}
            </span>
          </div>

          <Link
            to={`/season/${competition.id}/${encodeURIComponent(
              competition.name
            )}`}
            className="block text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold drop-shadow-md">
              {competition.name}
            </h1>
          </Link>

          <div className="flex items-center justify-center sm:justify-between mt-6">
            <TeamInfo team={homeTeam} teamImage={homeTeamImage} />
            <div className="text-3xl sm:text-5xl font-bold mx-6 tracking-tight text-white drop-shadow">
              {homeTeamResult?.current} - {awayTeamResult?.current}
            </div>
            <TeamInfo team={awayTeam} teamImage={awayTeamImage} />
          </div>
        </div>
      </div>

      {matchInfo.liveStatus === "SCHEDULED" && (
        <div className="mt-6">
          <MatchVoting matchInfo={matchInfo} />
        </div>
      )}

      <div className="mt-6">
        <MatchDetails
          moslavacIsHome={moslavacIsHome}
          matchEvents={matchEvents}
          homeTeam={matchLineups.home}
          awayTeam={matchLineups.away}
          competition={competition}
          homeTeamImage={homeTeamImage}
          awayTeamImage={awayTeamImage}
        />
      </div>

      <div className="mt-6">
        <RefereeInfo referees={matchReferees.matchOfficials} />
      </div>
    </div>
  );
}
