import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CompetitionMatches from './CompetitionMatches';
import Standings from './Standings';

const CompetitionInfo = () => {
    const { competitionId, competitionName } = useParams();
    const [activeTab, setActiveTab] = useState('matches');

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Naslov natjecanja */}
            <h1 className="text-2xl font-bold text-center mb-4">{decodeURIComponent(competitionName)}</h1>

            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg " role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${activeTab === 'matches'
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                            }`}
                        onClick={() => setActiveTab('matches')}
                    >
                        Utakmice
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r ${activeTab === 'standings'
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                            }`}
                        onClick={() => setActiveTab('standings')}
                    >
                        Tablica
                    </button>
                </div>
            </div>

            <div className="mt-6">
                {activeTab === 'matches' && <CompetitionMatches competitionId={competitionId} />}
                {activeTab === 'standings' && <Standings competitionId={competitionId} />}
            </div>
        </div>
    );
};

export default CompetitionInfo;
