import React from 'react';
import { useGetTeamStandings } from '../hooks/useGetTeamStandings';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { Table, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';

function Standings() {
    const { competitionId } = useParams(); // Get the competitionId from the URL
    const { data, error, isLoading } = useGetTeamStandings(competitionId);

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
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: 'Momčad',
            dataIndex: ['team', 'name'],
            key: 'team.name',
            render: (text, record) => (
                <div className="flex items-center">
                    <TeamImage picture={record.team.picture} teamName={record.team.name} />
                    <span className={`font-medium ${record.team.name === 'SNK Moslavac' ? 'text-blue-600 font-bold text-base' : 'text-gray-800'}`}>
                        {text}
                    </span>
                </div>
            ),
        },
        {
            title: 'O',
            dataIndex: 'played',
            key: 'played',
            align: 'center',
        },
        {
            title: 'P',
            dataIndex: 'wins',
            key: 'wins',
            align: 'center',
        },
        {
            title: 'N',
            dataIndex: 'draws',
            key: 'draws',
            align: 'center',
        },
        {
            title: 'I',
            dataIndex: 'losses',
            key: 'losses',
            align: 'center',
        },
        {
            title: 'Golovi',
            dataIndex: 'goalsFor',
            key: 'goalsFor',
            render: (_, record) => `${record.goalsFor}:${record.goalsAgainst}`,
            align: 'center',
        },
        {
            title: 'Bodovi',
            dataIndex: 'points',
            key: 'points',
            align: 'center',
            className: 'font-bold',
        },
    ];

    return (
        <div className="overflow-x-auto bg-gray-50 p-6 max-w-3xl mx-auto my-12 rounded-3xl shadow-xl ">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Tablica</h2>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="team.id"
                pagination={false}
                bordered={false}
                className="table-auto"
                rowClassName={(record) =>
                    `${record.team.name === 'SNK Moslavac' ? 'bg-blue-50' : (record.position % 2 === 0 ? 'bg-white' : 'bg-gray-100')} hover:bg-transparent`
                }
                style={{ borderCollapse: 'collapse' }}
            />
        </div>
    );
}

const TeamImage = ({ picture, teamName }) => {
    const { data, error, isLoading } = useGetCometImage(picture);

    if (isLoading) return <Spin size="small" />;
    if (error) return <Alert message="Error" description={error.message} type="error" />;

    return (
        <img src={data} alt={teamName} className="w-10 h-10 rounded-full mr-2" />
    );
};

export default Standings;
