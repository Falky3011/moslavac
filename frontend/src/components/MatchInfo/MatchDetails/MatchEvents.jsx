import React from 'react';
import { FaSquareFull } from 'react-icons/fa';
import { SwapOutlined } from '@ant-design/icons';
import GoalEvent from './GoalEvent';
import { Link } from 'react-router-dom';
import { formatEventTime, renderPlayerName } from '../../../utils/eventUtils';

const MatchEvents = ({ moslavacIsHome, matchEvents, competition }) => {
    const renderEventContent = (event, isMoslavacEvent, eventTextColor) => {
        const contentMap = {
            START: event.matchPhase.fcdName === "FIRST_HALF" && <span className="font-bold">POČETAK</span>,
            END: event.matchPhase.fcdName === "FIRST_HALF" && <span className="font-bold">POLUVRIJEME</span>,
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
                <div className="flex items-center space-x-2">
                    <FaSquareFull className="text-yellow-500" />
                    <span className={`font-semibold ${eventTextColor}`}>
                        {renderPlayerName(event.player || event.teamOfficial, isMoslavacEvent)}{" "}
                        {formatEventTime(event.minuteFull, event.stoppageTime)}
                    </span>
                </div>
            ),
            SECOND_YELLOW: (
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <FaSquareFull className="text-yellow-500" />
                        <FaSquareFull className="text-red-500 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4" />
                    </div>
                    <span className={eventTextColor}>
                        {renderPlayerName(event.player || event.teamOfficial, isMoslavacEvent)}{" "}
                        {formatEventTime(event.minuteFull, event.stoppageTime)}
                    </span>
                </div>
            ),
            RED: (
                <div className="flex items-center space-x-2">
                    <FaSquareFull className="text-red-500" />
                    <span className={eventTextColor}>
                        {renderPlayerName(event.player || event.teamOfficial, isMoslavacEvent)}{" "}
                        {formatEventTime(event.minuteFull, event.stoppageTime)}
                    </span>
                </div>
            ),
            SUBSTITUTION: (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                        <SwapOutlined className="text-green-500" />
                        <span className={`font-semibold ${eventTextColor}`}>
                            {renderPlayerName(event.player, isMoslavacEvent)}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={eventTextColor}>
                            {renderPlayerName(event.player2, isMoslavacEvent)}{" "}
                            {formatEventTime(event.minuteFull, event.stoppageTime)}
                        </span>
                    </div>
                </div>
            ),
            FULL_TIME: <span className="font-bold">KRAJ</span>,
        };

        return contentMap[event.eventType.fcdName] || null;
    };

    const renderEvent = (event) => {
        const isMoslavacEvent =
            (moslavacIsHome && event.homeTeam) || (!moslavacIsHome && !event.homeTeam);
        const eventTextColor = isMoslavacEvent ? "text-blue-600" : "text-gray-600";

        const eventContent = renderEventContent(event, isMoslavacEvent, eventTextColor);

        if (!eventContent) return null;

        const justifyClass = event.homeTeam === undefined ? "justify-center" : event.homeTeam ? "justify-start" : "justify-end";
        const textAlignClass = event.homeTeam === undefined ? "text-center" : event.homeTeam ? "text-left" : "text-right";

        return (
            <div className={`w-full flex ${justifyClass} ${textAlignClass}`}>
                {eventContent}
            </div>
        );
    };

    return (
        <div className="mb-8 w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
                {matchEvents.map((event, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                        {renderEvent(event)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchEvents;
