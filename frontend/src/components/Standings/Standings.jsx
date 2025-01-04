import React from 'react';
import { Table, Spin, Alert, Tabs } from 'antd';
import { useGetTeamStandings } from '../../hooks/useGetTeamStandings';
import { StandingsColumns } from './StandingsColumns';

const { TabPane } = Tabs;

const Standings = ({ competitionId }) => {
    const { data, error, isLoading } = useGetTeamStandings(competitionId);

    // Loading State
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="max-w-3xl mx-auto p-4">
                <Alert
                    message="Error"
                    description={`Failed to load standings. ${error.message}`}
                    type="error"
                    showIcon
                    className="rounded-lg shadow-md"
                />
            </div>
        );
    }

    // No Data State
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-4">
                <Alert
                    message="No Data"
                    description="No standings data available."
                    type="info"
                    showIcon
                    className="rounded-lg shadow-md"
                />
            </div>
        );
    }

    // Columns
    const columns = StandingsColumns();

    // Render Table
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
        <div className="max-w-6xl mx-auto px-4 py-8 rounded-3xl shadow-md bg-white">
            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
                {renderTable(columns.desktopColumns)}
            </div>

            {/* Mobile View */}
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