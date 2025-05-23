import React from "react";
import { Link } from "react-router-dom";

const PlayerList = ({ players, isAwayTeam, moslavacIsHome, competition }) => (
  <ul className={`space-y-2 ${isAwayTeam ? "md:text-right" : ""}`}>
    {players.map((player) => {
      const isMoslavac = moslavacIsHome !== isAwayTeam;
      return (
        <li
          key={player.personId}
          className={`flex items-center justify-center ${
            isAwayTeam ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="font-bold">{player.shirtNumber}</span>
            {isMoslavac ? (
              <Link
                to={`/stats/${player.personId}/${competition.id}`}
                className="hover:underline"
              >
                <span>{player.name}</span>
              </Link>
            ) : (
              <span>{player.name}</span>
            )}
            {player.captain && (
              <span className="text-gray-500 text-sm">(C)</span>
            )}
            {player.position === "G" && (
              <span className="text-gray-500 text-sm">(GK)</span>
            )}
          </div>
        </li>
      );
    })}
  </ul>
);

export default PlayerList;
