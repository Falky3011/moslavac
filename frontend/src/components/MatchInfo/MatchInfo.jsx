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
      <div className="flex justify-center items-center h-screen">
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
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
      {/* Match Info Header */}
      <div className="bg-white shadow-md rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <span className="text-xs sm:text-sm font-medium mb-2 sm:mb-0">
              {new Date(dateTimeUTC).toLocaleDateString()}
            </span>
            <span className="text-xs sm:text-sm font-bold">Kolo {round}</span>
          </div>
          <Link
            to={`/season/${competition.id}/${encodeURIComponent(
              competition.name
            )}`}
            className="block text-center"
          >
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              {competition.name}
            </h1>
          </Link>
          <div className="flex items-center justify-center sm:justify-between">
            <TeamInfo team={homeTeam} teamImage={homeTeamImage} />
            <div className="flex-shrink-0 text-2xl sm:text-4xl font-bold mx-4">
              {homeTeamResult?.current} - {awayTeamResult?.current}
            </div>
            <TeamInfo team={awayTeam} teamImage={awayTeamImage} />
          </div>
        </div>
      </div>

      {matchInfo.liveStatus === "SCHEDULED" && (
        <MatchVoting matchInfo={matchInfo} />
      )}

      <div>
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

      <RefereeInfo referees={matchReferees.matchOfficials} />
    </div>
  );
}
