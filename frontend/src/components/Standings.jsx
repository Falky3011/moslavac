import React from 'react';
import { Table, Spin, Alert, Tabs } from 'antd';
import { useGetTeamStandings } from '../hooks/useGetTeamStandings';
import { useGetCometImage } from '../hooks/useGetCometImage';

const { TabPane } = Tabs;

const Standings = ({ competitionId }) => {
    const { data, error, isLoading } = useGetTeamStandings(competitionId);

    const TeamImage = ({ picture, teamName }) => {
        const { data: imageData, error: imageError, isLoading: imageIsLoading } = useGetCometImage(picture);
        console.log(imageData)

        if (imageIsLoading) return <Spin size="small" />;
        if (imageError) return <span className="text-red-500">!</span>;

        return (
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {imageData ? (
                    <img src={imageData} alt={`${teamName} logo`} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-500 text-xs font-bold">{teamName.slice(0, 2).toUpperCase()}</span>
                )}
            </div>
        );
    };

    const splitTeamName = (name) => {
        const words = name.split(' ');
        if (words.length <= 2) return name;

        const midpoint = Math.ceil(words.length / 2);
        return (
            <>
                {words.slice(0, midpoint).join(' ')}
                <br />
                {words.slice(midpoint).join(' ')}
            </>
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description={`Failed to load standings. ${error.message}`}
                type="error"
                showIcon
            />
        );
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <Alert
                message="No Data"
                description="No standings data available."
                type="info"
                showIcon
            />
        );
    }

    const mainColumns = [
        {
            title: '#',
            dataIndex: 'position',
            key: 'position',
            align: 'center',
            render: (text) => <span className="font-semibold text-xs">{text}</span>,
            width: 30,
        },
        {
            title: 'Tim',
            dataIndex: ['team', 'name'],
            key: 'team.name',
            render: (text, record) => (
                <div className="flex items-center">
                    <TeamImage picture={record.team.picture} teamName={record.team.name} />
                    <span className={`font-medium ml-2 text-xs leading-tight ${record.team.name === 'SNK Moslavac' ? 'text-blue-600 font-bold' : 'text-gray-800'}`}>
                        {splitTeamName(text)}
                    </span>
                </div>
            ),
            width: 120,
        },
        {
            title: 'BOD',
            dataIndex: 'points',
            key: 'points',
            align: 'center',
            className: 'font-bold text-xs',
            width: 40,
        },
    ];

    const resultsColumns = [
        {
            title: 'O',
            dataIndex: 'played',
            key: 'played',
            align: 'center',
            width: 30,
        },
        {
            title: 'P',
            dataIndex: 'wins',
            key: 'wins',
            align: 'center',
            width: 30,
        },
        {
            title: 'N',
            dataIndex: 'draws',
            key: 'draws',
            align: 'center',
            width: 30,
        },
        {
            title: 'I',
            dataIndex: 'losses',
            key: 'losses',
            align: 'center',
            width: 30,
        },
    ];

    const goalsColumns = [
        {
            title: 'Golovi',
            key: 'goals',
            align: 'center',
            render: (record) => `${record.goalsFor}:${record.goalsAgainst}`,
            width: 70,
        },
        {
            title: 'RAZ',
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
            render: (record) => {
                const formResults = ['m1', 'm2', 'm3', 'm4', 'm5'].map((key) => record[key]?.result || '-');
                return (
                    <div className="flex justify-center space-x-1">
                        {formResults.map((result, index) => (
                            <span
                                key={index}
                                className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full ${result === 'W' ? 'bg-green-500 text-white' :
                                    result === 'D' ? 'bg-yellow-500 text-white' :
                                        result === 'L' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {result}
                            </span>
                        ))}
                    </div>
                );
            },
            width: 120,
        },
    ];

    const desktopColumns = [...mainColumns, ...resultsColumns, ...goalsColumns, ...formColumn];

    const renderTable = (columns) => (
        <Table
            dataSource={data}
            columns={columns}
            rowKey={(record) => record.team.id}
            pagination={false}
            className="w-full text-xs"
            rowClassName={(record) =>
                `${record.team.name === 'SNK Moslavac'
                    ? 'bg-blue-50'
                    : record.position % 2 === 0
                        ? 'bg-gray-50'
                        : 'bg-white'
                }`
            }
            size="small"
        />
    );

    return (
        <div>
            <div className="hidden sm:block overflow-x-auto">
                {renderTable(desktopColumns)}
            </div>
            <div className="sm:hidden">
                <Tabs defaultActiveKey="main" centered>
                    <TabPane tab="Bodovi" key="main">
                        {renderTable(mainColumns)}
                    </TabPane>
                    <TabPane tab="Rezultati" key="results">
                        {renderTable([...mainColumns.slice(0, 2), ...resultsColumns])}
                    </TabPane>
                    <TabPane tab="Golovi" key="goals">
                        {renderTable([...mainColumns.slice(0, 2), ...goalsColumns])}
                    </TabPane>
                    <TabPane tab="Forma" key="form">
                        {renderTable([...mainColumns.slice(0, 2), ...formColumn])}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Standings;

