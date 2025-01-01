import React from 'react';
import PlayerList from './PlayerList';

const TeamLineup = ({ team, isAwayTeam, filterAndSortPlayers, isStarter, moslavacIsHome, competition }) => (
    <div className="text-center md:text-left">
        {isStarter && <h3 className="text-lg font-semibold mb-4 md:hidden">Početna postava</h3>}
        <PlayerList
            players={filterAndSortPlayers(team.players, isStarter)}
            isAwayTeam={isAwayTeam}
            moslavacIsHome={moslavacIsHome}
            competition={competition}
        />
    </div>
);

export default TeamLineup;
