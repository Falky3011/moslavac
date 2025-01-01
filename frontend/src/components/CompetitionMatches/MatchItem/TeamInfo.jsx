import React from 'react';
import { Typography } from 'antd';
import TeamImage from './TeamImage';

const TeamInfo = ({ team, align = 'right', isHome }) => (
    <div className={`flex items-center justify-center sm:justify-${align} w-full sm:w-2/5`}>
        {isHome && (
            <Typography.Text className="text-gray-800 font-bold text-center sm:text-right text-sm sm:text-base mr-2 truncate max-w-[120px] sm:max-w-[150px]">
                {team.name}
            </Typography.Text>
        )}
        <TeamImage picture={team.picture} teamName={team.name} />
        {!isHome && (
            <Typography.Text className="text-gray-800 font-bold text-center sm:text-left text-sm sm:text-base ml-2 truncate max-w-[120px] sm:max-w-[150px]">
                {team.name}
            </Typography.Text>
        )}
    </div>
);

export default TeamInfo;
