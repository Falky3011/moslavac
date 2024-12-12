import React from 'react';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { Table, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import useGetTeamStandingsUnoffical from '../hooks/useGetTeamUnofficialStandings';

function StandingsUnofficial({ competitionId }) {
    console.log(competitionId)
    const { data, error, isLoading } = useGetTeamStandingsUnoffical(competitionId);
    console.log(data)

    if (isLoading) {
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <Alert message="Error" description={error.message} type="error" />;
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'position',
            key: 'position',
            align: 'center',
            render: (text) => <span className="font-semibold text-sm">{text}</span>,
            width: 50,
        },
        {
            title: 'Momčad',
            dataIndex: ['team', 'name'],
            key: 'team.name',
            render: (text, record) => (
                <div className="flex items-center">
                    <TeamImage picture={record.team.picture} teamName={record.team.name} />
                    <span
                        className={`font-medium ${record.team.name === 'SNK Moslavac'
                            ? 'text-blue-600 font-bold text-sm sm:text-base'
                            : 'text-gray-800'
                            }`}
                    >
                        {text}
                    </span>
                </div>
            ),
            width: 150,
        },
        {
            title: 'O',
            dataIndex: 'played',
            key: 'played',
            align: 'center',
            responsive: ['sm'],
            width: 60,
        },
        {
            title: 'P',
            dataIndex: 'wins',
            key: 'wins',
            align: 'center',
            responsive: ['sm'],
            width: 60,
        },
        {
            title: 'N',
            dataIndex: 'draws',
            key: 'draws',
            align: 'center',
            responsive: ['sm'],
            width: 60,
        },
        {
            title: 'I',
            dataIndex: 'losses',
            key: 'losses',
            align: 'center',
            responsive: ['sm'],
            width: 60,
        },
        {
            title: 'Golovi',
            dataIndex: 'goalsFor',
            key: 'goalsFor',
            render: (_, record) => `${record.goalsFor}:${record.goalsAgainst}`,
            align: 'center',
            responsive: ['sm'],
            width: 100,
        },
        {
            title: 'Bodovi',
            dataIndex: 'points',
            key: 'points',
            align: 'center',
            className: 'font-bold text-sm sm:text-base',
            width: 80,
        },
        {
            title: 'Uživo',
            dataIndex: 'liveResult',
            key: 'liveResult',
            align: 'center',
            render: (liveResult) => (
                liveResult ? (
                    <span
                        className={`px-2 py-1 rounded text-xs font-bold ${liveResult === 'W'
                            ? 'bg-green-200 text-green-800'
                            : liveResult === 'D'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-red-200 text-red-800'
                            }`}
                    >
                        {liveResult}
                    </span>
                ) : '-'
            ),
        },
    ];

    return (
        <div className="bg-white border border-gray-200  p-4 sm:p-6 max-w-full sm:max-w-3xl mx-auto mb-8 rounded-3xl shadow-md">
            <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
                Neslužbena Tablica
            </h2>
            <div className="overflow-hidden">
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="team.id"
                    pagination={false}
                    bordered={false}
                    className="table-fixed w-full text-xs sm:text-sm"
                    rowClassName={(record) =>
                        `${record.highlight
                            ? 'bg-yellow-100'
                            : record.position % 2 === 0
                                ? 'bg-white'
                                : 'bg-gray-100'
                        } `
                    }
                />
            </div>
        </div>
    );
}

const TeamImage = ({ picture, teamName }) => {
    const { data, error, isLoading } = useGetCometImage(picture);

    if (isLoading) return <Spin size="small" />;
    if (error) return <Alert message="Error" description={error.message} type="error" />;

    return <img src={data.image} alt={teamName} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2" />;
};

export default StandingsUnofficial;
