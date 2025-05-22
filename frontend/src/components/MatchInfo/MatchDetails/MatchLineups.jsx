import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";

const MatchLineups = ({
  moslavacIsHome,
  homeTeam,
  awayTeam,
  competition,
  homeTeamImage,
  awayTeamImage,
}) => {
  const [activeTab, setActiveTab] = useState("home");

  const filterAndSortPlayers = (players, isStarter) =>
    players
      .filter((player) => player.starting === isStarter)
      .sort((a, b) => (a.position === "G" ? -1 : b.position === "G" ? 1 : 0));

  const PlayerList = ({ players, isAwayTeam }) => (
    <ul
      className={`space-y-3 ${
        isAwayTeam ? "md:text-right text-center" : "text-center md:text-left"
      }`}
    >
      {players.map((player) => {
        const isMoslavac = moslavacIsHome !== isAwayTeam;
        return (
          <li
            key={player.personId}
            className={`flex items-center ${
              isAwayTeam
                ? "md:justify-end justify-center"
                : "md:justify-start justify-center"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md shadow-sm">
                {player.shirtNumber}
              </span>
              {isMoslavac ? (
                <Link
                  to={`/stats/${player.personId}`}
                  state={{ competition }}
                  className="hover:underline  text-gray-800"
                >
                  {player.name}
                </Link>
              ) : (
                <span className="text-gray-700">{player.name}</span>
              )}
              {player.captain && (
                <span className="text-gray-400 text-xs">(C)</span>
              )}
              {player.position === "G" && (
                <span className="text-gray-400 text-xs">(GK)</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl overflow-hidden mb-10 mx-auto max-w-4xl">
      {/* Desktop View */}
      <div className="hidden md:block px-8 py-10">
        {/* Početna postava */}
        <h4 className="text-lg font-medium mb-4 text-center text-gray-600">
          Početna postava
        </h4>
        <div className="grid grid-cols-2 gap-10 mb-10">
          <PlayerList
            players={filterAndSortPlayers(homeTeam.players, true)}
            isAwayTeam={false}
          />
          <PlayerList
            players={filterAndSortPlayers(awayTeam.players, true)}
            isAwayTeam={true}
          />
        </div>

        {/* Zamjene */}
        <h4 className="text-lg font-medium mb-4 text-center text-gray-600">
          Zamjene
        </h4>
        <div className="grid grid-cols-2 gap-10">
          <PlayerList
            players={filterAndSortPlayers(homeTeam.players, false)}
            isAwayTeam={false}
          />
          <PlayerList
            players={filterAndSortPlayers(awayTeam.players, false)}
            isAwayTeam={true}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-6 text-center transition-all ${
              activeTab === "home"
                ? "bg-white/80 font-semibold text-blue-600 shadow-inner"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <img
              src={homeTeamImage?.data}
              alt={homeTeam.name}
              className="w-10 h-10 mx-auto mb-1 object-cover rounded-full shadow"
            />
            <span className="text-sm">{homeTeam.name}</span>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center transition-all ${
              activeTab === "away"
                ? "bg-white/80 font-semibold text-blue-600 shadow-inner"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("away")}
          >
            <img
              src={awayTeamImage?.data}
              alt={awayTeam.name}
              className="w-10 h-10 mx-auto mb-1 object-cover rounded-full shadow"
            />
            <span className="text-sm">{awayTeam.name}</span>
          </button>
        </div>
        <div className="px-6 py-6">
          {activeTab === "home" ? (
            <>
              <h4 className="text-base text-center font-semibold mb-3 text-gray-700">
                Početna postava
              </h4>
              <PlayerList
                players={filterAndSortPlayers(homeTeam.players, true)}
                isAwayTeam={false}
              />
              <Divider plain className="text-gray-400 my-6">
                Zamjene
              </Divider>
              <PlayerList
                players={filterAndSortPlayers(homeTeam.players, false)}
                isAwayTeam={false}
              />
            </>
          ) : (
            <>
              <h4 className="text-base text-center font-semibold mb-3 text-gray-700">
                Početna postava
              </h4>
              <PlayerList
                players={filterAndSortPlayers(awayTeam.players, true)}
                isAwayTeam={true}
              />
              <Divider plain className="text-gray-400 my-6">
                Zamjene
              </Divider>
              <PlayerList
                players={filterAndSortPlayers(awayTeam.players, false)}
                isAwayTeam={true}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchLineups;
