import React from "react";
import { Table, Tabs } from "antd";
import { Link } from "react-router-dom";

import useGetCompetitionGoalsStats from "../../hooks/useGetCompetitionGoalStats";
import useGetCompetitionRedCardsStats from "../../hooks/useGetCompetitionRedCardsStats";
import useGetCompetitionYellowCardsStats from "../../hooks/useGetCompetitionYellowCardStats";
import { useGetCometImage } from "../../hooks/useGetCometImage";

const { TabPane } = Tabs;

const PlayerImage = ({ uuid }) => {
  const { data: imageUrl, isLoading } = useGetCometImage(uuid);

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full bg-gray-200"></div>;
  }

  return (
    <img
      src={imageUrl}
      alt="Player"
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};

const getColumns = (competitionId) => [
  {
    dataIndex: "player",
    key: "player",
    render: (player) => (
      <div className="flex items-center space-x-3">
        <PlayerImage uuid={player.picture} />
        <Link to={`/stats/${player.personId}/${competitionId}`}>
          <span className="font-medium">{player.shortName}</span>
        </Link>
      </div>
    ),
  },
  {
    dataIndex: "value",
    key: "value",
    render: (value) => <span className="font-semibold">{value}</span>,
  },
];

const StatisticsTable = ({ data, competitionId }) => (
  <Table
    columns={getColumns(competitionId)}
    dataSource={data}
    rowKey={(record) => record.player.personId.toString()}
    pagination={false}
    className="w-full"
    showHeader={false}
  />
);

const Statistics = ({ competitionId }) => {
  const { data: goalsData, isLoading: isLoadingGoals } =
    useGetCompetitionGoalsStats(competitionId);
  const { data: redCardsData, isLoading: isLoadingRedCards } =
    useGetCompetitionRedCardsStats(competitionId);
  const { data: yellowCardsData, isLoading: isLoadingYellowCards } =
    useGetCompetitionYellowCardsStats(competitionId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 rounded-3xl shadow-md bg-white">
      <Tabs defaultActiveKey="1" className="text-gray-700" centered>
        <TabPane tab="Golovi" key="1">
          {isLoadingGoals ? (
            <p>Loading goals data...</p>
          ) : (
            <StatisticsTable
              data={goalsData || []}
              competitionId={competitionId}
            />
          )}
        </TabPane>
        <TabPane tab="Crveni kartoni" key="2">
          {isLoadingRedCards ? (
            <p>Loading red cards data...</p>
          ) : (
            <StatisticsTable
              data={redCardsData || []}
              competitionId={competitionId}
            />
          )}
        </TabPane>
        <TabPane tab="Žuti kartoni" key="3">
          {isLoadingYellowCards ? (
            <p>Loading yellow cards data...</p>
          ) : (
            <StatisticsTable
              data={yellowCardsData || []}
              competitionId={competitionId}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statistics;
