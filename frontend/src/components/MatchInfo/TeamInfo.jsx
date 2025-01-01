import React from 'react';

const TeamInfo = ({ team, teamImage }) => (
    <div className="flex-1 text-center">
        <img
            src={teamImage?.data}
            alt={team.name}
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-white p-1 sm:p-2"
        />
        <span className="font-semibold text-xs sm:text-sm">{team.name}</span>
    </div>
);

export default TeamInfo;
