import React, { useState } from 'react';
import MatchEvents from './MatchEvents';
import MatchLineups from './MatchLineups';

const MatchInfo = ({ moslavacIsHome, matchEvents, homeTeam, awayTeam, competition, homeTeamImage, awayTeamImage }) => {
    const [activeTab, setActiveTab] = useState('events');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className=" rounded-full p-1 flex justify-center mb-6">
                <button
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${activeTab === 'events'
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-white text-gray-500 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('events')}
                >
                    Detalji
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r ${activeTab === 'lineups'
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-white text-gray-500 hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab('lineups')}
                >
                    Postave
                </button>
            </div>
            {activeTab === 'events' ? (
                <MatchEvents moslavacIsHome={moslavacIsHome} matchEvents={matchEvents} competition={competition} />
            ) : (
                <MatchLineups moslavacIsHome={moslavacIsHome} homeTeam={homeTeam} awayTeam={awayTeam} competition={competition} homeTeamImage={homeTeamImage} awayTeamImage={awayTeamImage} />
            )}
        </div>
    );
};

export default MatchInfo;