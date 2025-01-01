import React from 'react';
import { splitTeamName } from '../../utils/StandingsStringUtils';
import { renderForm } from '../../utils/StandingsFormUtils';
import { StandingsTeamImage as TeamImage } from './StandingsTeamImage';

export const StandingsColumns = () => {
    const mainColumns = [
        {
            title: '#',
            dataIndex: 'position',
            key: 'position',
            align: 'center',
            render: (text) => <span className="font-semibold">{text}</span>,
            width: 40,
        },
        {
            title: 'Tim',
            dataIndex: ['team', 'name'],
            key: 'team.name',
            render: (text, record) => (
                <div className="flex items-center">
                    <TeamImage picture={record.team.picture} teamName={record.team.name} />
                    <span className={`font-medium ml-2 md:ml-3 leading-tight ${record.team.name === 'SNK Moslavac' ? 'text-blue-600 font-bold' : 'text-gray-800'}`}>
                        {splitTeamName(text)}
                    </span>
                </div>
            ),
            width: 200,
        },
        {
            title: 'BOD',
            dataIndex: 'points',
            key: 'points',
            align: 'center',
            className: 'font-bold',
            width: 60,
        },
    ];

    const resultsColumns = [
        {
            title: 'O',
            dataIndex: 'played',
            key: 'played',
            align: 'center',
            width: 40,
        },
        {
            title: 'P',
            dataIndex: 'wins',
            key: 'wins',
            align: 'center',
            width: 40,
        },
        {
            title: 'N',
            dataIndex: 'draws',
            key: 'draws',
            align: 'center',
            width: 40,
        },
        {
            title: 'I',
            dataIndex: 'losses',
            key: 'losses',
            align: 'center',
            width: 40,
        },
    ];

    const goalsColumns = [
        {
            title: 'Golovi',
            key: 'goals',
            align: 'center',
            render: (record) => `${record.goalsFor}:${record.goalsAgainst}`,
            width: 80,
        },
        {
            title: 'Raz',
            key: 'goalDifference',
            align: 'center',
            render: (record) => record.goalsFor - record.goalsAgainst,
            width: 60,
        },
    ];

    const formColumn = [
        {
            title: 'Forma',
            key: 'form',
            render: renderForm,
            width: 140,
        },
    ];

    const desktopColumns = [...mainColumns, ...resultsColumns, ...goalsColumns, ...formColumn];

    return {
        mainColumns,
        resultsColumns,
        goalsColumns,
        formColumn,
        desktopColumns,
    };
};

