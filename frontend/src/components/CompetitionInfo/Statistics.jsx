import React from "react";
import { Table, Tabs } from "antd";
import useGetCompetitionGoalsStats from "../../hooks/useGetCompetitionGoalStats";
import useGetCompetitionRedCardsStats from "../../hooks/useGetCompetitionRedCardsStats";
import useGetCompetitionYellowCardsStats from "../../hooks/useGetCompetitionYellowCardStats";
import { useGetCometImage } from "../../hooks/useGetCometImage";

const { TabPane } = Tabs;

const PlayerImage = ({ uuid }) => {
  const { data: imageUrl, isLoading } = useGetCometImage(uuid);

  if (isLoading) {
    return (
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200"></div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Player"
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
    />
  );
};

const columns = [
  {
    title: "Igrač",
    dataIndex: "player",
    key: "player",
    render: (player) => (
      <div className="flex items-center space-x-2 sm:space-x-3">
        <PlayerImage uuid={player.picture} />
        <span className="font-medium text-sm sm:text-base">
          {player.shortName}
        </span>
      </div>
    ),
  },
  {
    title: "Vrijednost",
    dataIndex: "value",
    key: "value",
    render: (value) => (
      <span className="font-semibold text-sm sm:text-base">{value}</span>
    ),
  },
];

const StatisticsTable = ({ data }) => (
  <Table
    columns={columns}
    dataSource={data}
    rowKey={(record) => record.player.personId.toString()}
    pagination={false}
    className="w-full"
    scroll={{ x: true }}
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
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-white rounded-xl sm:rounded-3xl shadow-md">
      <Tabs
        defaultActiveKey="1"
        className="text-gray-700"
        centered
        tabBarStyle={{ marginBottom: "1rem" }}
      >
        <TabPane tab="Golovi" key="1">
          {isLoadingGoals ? (
            <p className="text-center py-4">Loading goals data...</p>
          ) : (
            <StatisticsTable data={goalsData || []} />
          )}
        </TabPane>
        <TabPane tab="Crveni kartoni" key="2">
          {isLoadingRedCards ? (
            <p className="text-center py-4">Loading red cards data...</p>
          ) : (
            <StatisticsTable data={redCardsData || []} />
          )}
        </TabPane>
        <TabPane tab="Žuti kartoni" key="3">
          {isLoadingYellowCards ? (
            <p className="text-center py-4">Loading yellow cards data...</p>
          ) : (
            <StatisticsTable data={yellowCardsData || []} />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statistics;
