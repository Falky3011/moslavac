import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchEvents from './MatchEvents'
import MatchLineups from './MatchLineups'

const MatchInfo = ({ moslavacIsHome, matchEvents, homeTeam, awayTeam }) => {
    const [activeTab, setActiveTab] = useState('events');


    return (
        <div className="container mx-auto px-4 py-8">

            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${activeTab === 'events'
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                            }`}
                        onClick={() => setActiveTab('events')}
                    >
                        Detalji
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r ${activeTab === 'lineups'
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                            }`}
                        onClick={() => setActiveTab('lineups')}
                    >
                        Postave
                    </button>
                </div>
            </div>

            <div className="mt-6">
                {activeTab === 'events' && <MatchEvents moslavacIsHome={moslavacIsHome} matchEvents={matchEvents} />}
                {activeTab === 'lineups' && <MatchLineups homeTeam={homeTeam} awayTeam={awayTeam} />}
            </div>
        </div>
    );
};

export default MatchInfo;
