import React from "react";
import { FaSquareFull } from "react-icons/fa";
import { SwapOutlined } from "@ant-design/icons";
import GoalEvent from "./GoalEvent";
import { formatEventTime, renderPlayerName } from "../../../utils/eventUtils";

const MatchEvents = ({ moslavacIsHome, matchEvents, competition }) => {
  const renderEventContent = (event, isMoslavacEvent, eventTextColor) => {
    const baseText = `text-sm sm:text-base ${eventTextColor}`;

    const badge = (color) => <FaSquareFull className={`text-${color}-500`} />;

    const withTime = (player) => (
      <span className={`${baseText} font-medium`}>
        {renderPlayerName(player, isMoslavacEvent, competition)}{" "}
        {formatEventTime(event.minuteFull, event.stoppageTime)}
      </span>
    );

    return (
      {
        START: event.matchPhase.fcdName === "FIRST_HALF" && (
          <span className="font-semibold text-gray-700">POČETAK</span>
        ),
        END: event.matchPhase.fcdName === "FIRST_HALF" && (
          <span className="font-semibold text-gray-700">POLUVRIJEME</span>
        ),
        GOAL: (
          <GoalEvent
            event={event}
            isMoslavacEvent={isMoslavacEvent}
            isOwnGoal={false}
            competition={competition}
          />
        ),
        PENALTY: (
          <GoalEvent
            event={event}
            isMoslavacEvent={isMoslavacEvent}
            isOwnGoal={false}
            competition={competition}
          />
        ),
        OWN_GOAL: (
          <GoalEvent
            event={event}
            isMoslavacEvent={isMoslavacEvent}
            isOwnGoal={true}
            competition={competition}
          />
        ),
        YELLOW: (
          <div className="flex items-center gap-2">
            {badge("yellow")}
            {withTime(event.player || event.teamOfficial)}
          </div>
        ),
        SECOND_YELLOW: (
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSquareFull className="text-yellow-500" />
              <FaSquareFull className="text-red-500 absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3" />
            </div>
            {withTime(event.player || event.teamOfficial)}
          </div>
        ),
        RED: (
          <div className="flex items-center gap-2">
            {badge("red")}
            {withTime(event.player || event.teamOfficial)}
          </div>
        ),
        SUBSTITUTION: (
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <SwapOutlined className="text-green-500" />
              <span className={`${baseText} font-semibold`}>
                {renderPlayerName(event.player, isMoslavacEvent, competition)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={baseText}>
                {renderPlayerName(event.player2, isMoslavacEvent, competition)}{" "}
                {formatEventTime(event.minuteFull, event.stoppageTime)}
              </span>
            </div>
          </div>
        ),
        FULL_TIME: <span className="font-semibold text-gray-700">KRAJ</span>,
      }[event.eventType.fcdName] || null
    );
  };

  const renderEvent = (event) => {
    const isMoslavacEvent =
      (moslavacIsHome && event.homeTeam) ||
      (!moslavacIsHome && !event.homeTeam);
    const eventTextColor = isMoslavacEvent ? "text-blue-600" : "text-gray-600";

    const content = renderEventContent(event, isMoslavacEvent, eventTextColor);
    if (!content) return null;

    const align =
      event.homeTeam === undefined
        ? "justify-center text-center"
        : event.homeTeam
        ? "justify-start text-left"
        : "justify-end text-right";

    return <div className={`w-full flex ${align}`}>{content}</div>;
  };

  return (
    <div className="mb-12 w-full max-w-3xl mx-auto bg-white/60 backdrop-blur-md shadow-xl rounded-3xl border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {matchEvents.map((event, index) => {
          const renderedEvent = renderEvent(event);
          return renderedEvent ? (
            <div
              key={index}
              className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              {renderedEvent}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MatchEvents;
