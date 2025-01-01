import React from 'react';
import { Table, Spin, Alert, Tabs } from 'antd';
import { useGetTeamStandings } from '../../hooks/useGetTeamStandings';
import { renderForm } from '../../utils/StandingsFormUtils';
import { splitTeamName } from '../../utils/StandingsStringUtils';
import { StandingsTeamImage } from './StandingsTeamImage';
import { StandingsColumns } from './StandingsColumns';

const { TabPane } = Tabs;

const Standings = ({ competitionId }) => {
    const { data, error, isLoading } = useGetTeamStandings(competitionId);

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

    const columns = StandingsColumns();

    const renderTable = (columns) => (
        <Table
            dataSource={data}
            columns={columns}
            rowKey={(record) => record.team.id}
            pagination={false}
            className="w-full text-sm md:text-base lg:text-lg"
            rowClassName={(record) =>
                `${record.team.name === 'SNK Moslavac'
                    ? 'bg-blue-50'
                    : record.position % 2 === 0
                        ? 'bg-gray-50'
                        : 'bg-white'
                }`
            }
            size="middle"
        />
    );

    return (
        <div className="max-w-6xl mx-auto px-4  rounded-3xl shadow-md">
            <div className="hidden sm:block overflow-x-auto">
                {renderTable(columns.desktopColumns)}
            </div>
            <div className="sm:hidden">
                <Tabs defaultActiveKey="main" centered>
                    <TabPane tab="Bodovi" key="main">
                        {renderTable(columns.mainColumns)}
                    </TabPane>
                    <TabPane tab="Rezultati" key="results">
                        {renderTable([...columns.mainColumns.slice(0, 2), ...columns.resultsColumns])}
                    </TabPane>
                    <TabPane tab="Golovi" key="goals">
                        {renderTable([...columns.mainColumns.slice(0, 2), ...columns.goalsColumns])}
                    </TabPane>
                    <TabPane tab="Forma" key="form">
                        {renderTable([...columns.mainColumns.slice(0, 2), ...columns.formColumn])}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Standings;

