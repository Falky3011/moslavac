import React from "react";
import { FaSquareFull, FaFutbol } from 'react-icons/fa';
import { SwapOutlined } from '@ant-design/icons';
import GoalEvent from './GoalEvent';
import { Link } from "react-router-dom";

const MatchEvents = ({ moslavacIsHome, matchEvents, competition }) => {
    const formatEventTime = (minuteFull, stoppageTime) => {
        return stoppageTime ? `${minuteFull}+${stoppageTime}` : `${minuteFull}'`;
    };


    const renderEvent = (event) => {
        const isMoslavacEvent = (moslavacIsHome && event.homeTeam) || (!moslavacIsHome && !event.homeTeam);
        const eventTextColor = isMoslavacEvent ? 'text-blue-600' : 'text-gray-600';

        const renderPlayerName = (player) => {
            if (event.teamOfficial) {
                return player?.name;
            }

            return isMoslavacEvent ? (
                <Link to={`/stats/${player?.personId}`} state={{ competition }} className="hover:underline">
                    {player?.name}
                </Link>
            ) : (
                player?.name
            );
        };

        const eventContent = (() => {
            switch (event.eventType.fcdName) {
                case 'START':
                    return event.matchPhase.fcdName === 'FIRST_HALF' ? <span className="font-bold">POČETAK</span> : null;
                case 'END':
                    return event.matchPhase.fcdName === 'FIRST_HALF' ? <span className="font-bold">POLUVRIJEME</span> : null;
                case 'GOAL':
                case 'PENALTY':
                    return <GoalEvent event={event} isMoslavacEvent={isMoslavacEvent} isOwnGoal={false} competition={competition} />;
                case 'OWN_GOAL':
                    return <GoalEvent event={event} isMoslavacEvent={isMoslavacEvent} isOwnGoal={true} competition={competition} />;
                case 'YELLOW':
                    return (
                        <div className="flex items-center space-x-2">
                            <FaSquareFull className="text-yellow-500" />
                            <span className={`font-semibold ${eventTextColor}`}>
                                {renderPlayerName(event.player || event.teamOfficial)} {formatEventTime(event.minuteFull, event.stoppageTime)}
                            </span>
                        </div>
                    );
                case 'SECOND_YELLOW':
                    return (
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <FaSquareFull className="text-yellow-500" />
                                <FaSquareFull className="text-red-500 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4" />
                            </div>
                            <span className={eventTextColor}>
                                {renderPlayerName(event.player || event.teamOfficial)} {formatEventTime(event.minuteFull, event.stoppageTime)}
                            </span>
                        </div>
                    );
                case 'RED':
                    return (
                        <div className="flex items-center space-x-2">
                            <FaSquareFull className="text-red-500" />
                            <span className={eventTextColor}>
                                {renderPlayerName(event.player || event.teamOfficial)} {formatEventTime(event.minuteFull, event.stoppageTime)}
                            </span>
                        </div>
                    );
                case 'SUBSTITUTION':
                    return (
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                                <SwapOutlined className="text-green-500" />
                                <span className={`font-semibold ${eventTextColor}`}>{renderPlayerName(event.player)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={eventTextColor}>
                                    {renderPlayerName(event.player2)} {formatEventTime(event.minuteFull, event.stoppageTime)}
                                </span>
                            </div>
                        </div>
                    );
                case 'FULL_TIME':
                    return (
                        <span className="font-bold">KRAJ</span>
                    );
                default:
                    return null;
            }
        })();

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
                {matchEvents.map((event, index) => {
                    const eventContent = renderEvent(event);
                    if (!eventContent) return null;
                    return (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            {eventContent}
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default MatchEvents;

