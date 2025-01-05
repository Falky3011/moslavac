import React from "react";
import { Table, Spin, Alert, Tabs } from "antd";
import { useGetTeamStandings } from "../../hooks/useGetTeamStandings";
import { StandingsColumns } from "./StandingsColumns";

const { TabPane } = Tabs;

const Standings = ({ competitionId }) => {
  const { data, error, isLoading } = useGetTeamStandings(competitionId);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 sm:h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
        <Alert
          message="Error"
          description={`Failed to load standings. ${error.message}`}
          type="error"
          showIcon
          className="rounded-lg shadow-md text-sm sm:text-base"
        />
      </div>
    );
  }

  // No Data State
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
        <Alert
          message="No Data"
          description="No standings data available."
          type="info"
          showIcon
          className="rounded-lg shadow-md text-sm sm:text-base"
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
      className="w-full text-xs sm:text-sm md:text-base"
      rowClassName={(record) =>
        `${
          record.team.name === "SNK Moslavac"
            ? "bg-blue-50"
            : record.position % 2 === 0
            ? "bg-gray-50"
            : "bg-white"
        }`
      }
      size="small"
      scroll={{ x: "max-content" }}
    />
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8 rounded-xl sm:rounded-3xl shadow-md bg-white">
      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        {renderTable(columns.desktopColumns)}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <Tabs
          defaultActiveKey="main"
          centered
          size="small"
          tabBarStyle={{ marginBottom: "0.5rem" }}
        >
          <TabPane tab="Bodovi" key="main">
            {renderTable(columns.mainColumns)}
          </TabPane>
          <TabPane tab="Rezultati" key="results">
            {renderTable([
              ...columns.mainColumns.slice(0, 2),
              ...columns.resultsColumns,
            ])}
          </TabPane>
          <TabPane tab="Golovi" key="goals">
            {renderTable([
              ...columns.mainColumns.slice(0, 2),
              ...columns.goalsColumns,
            ])}
          </TabPane>
          <TabPane tab="Forma" key="form">
            {renderTable([
              ...columns.mainColumns.slice(0, 2),
              ...columns.formColumn,
            ])}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Standings;
