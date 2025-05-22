import React from "react";
import { FaFutbol } from "react-icons/fa";
import { useGetCometImage } from "../../../hooks/useGetCometImage";
import { formatEventTime, renderPlayerName } from "../../../utils/eventUtils";

const GoalEvent = ({ event, isMoslavacEvent, isOwnGoal, competition }) => {
  const { data: playerImage } = useGetCometImage(event.player?.picture);

  return (
    <div
      className={`flex items-center p-3 rounded-xl shadow-sm ${
        isMoslavacEvent ? "bg-blue-50" : "bg-gray-50"
      }`}
    >
      <FaFutbol
        className={`mr-4 ${
          isOwnGoal
            ? "text-red-500"
            : isMoslavacEvent
            ? "text-blue-500 text-xl"
            : "text-gray-500 text-lg"
        }`}
      />
      {playerImage && isMoslavacEvent && (
        <img
          src={playerImage}
          alt={event.player?.name || "Player"}
          className="w-10 h-10 rounded-full mr-4 object-cover shadow-md"
        />
      )}
      <div>
        <span
          className={`font-medium text-sm sm:text-base ${
            isMoslavacEvent ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {renderPlayerName(event.player, isMoslavacEvent, competition)}{" "}
          {formatEventTime(event.minuteFull, event.stoppageTime)}
        </span>
      </div>
    </div>
  );
};

export default GoalEvent;
