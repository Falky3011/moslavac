import React, { useState } from 'react';
import MatchEvents from './MatchEvents';
import MatchLineups from './MatchLineups';
import Standings from '../../Standings/Standings';
import TabNavigation from '../../TabNavigation';


const MatchDetails = ({ moslavacIsHome, matchEvents, homeTeam, awayTeam, competition, homeTeamImage, awayTeamImage }) => {
    const [activeTab, setActiveTab] = useState('events');

    const tabs = [
        {
            key: 'events',
            label: 'Detalji',
            content: (
                <MatchEvents
                    moslavacIsHome={moslavacIsHome}
                    matchEvents={matchEvents}
                    competition={competition}
                />
            ),
        },
        {
            key: 'lineups',
            label: 'Postave',
            content: (
                <MatchLineups
                    moslavacIsHome={moslavacIsHome}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    competition={competition}
                    homeTeamImage={homeTeamImage}
                    awayTeamImage={awayTeamImage}
                />
            ),
        },
        {
            key: 'table',
            label: 'Tablica',
            content: <Standings competitionId={competition?.id} />,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Tabs Navigation */}
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Active Tab Content */}
            <div>{tabs.find(tab => tab.key === activeTab)?.content}</div>
        </div>
    );
};

export default MatchDetails;
