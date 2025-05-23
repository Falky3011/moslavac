import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CompetitionMatches from "../CompetitionMatches/CompetitionMatches";
import Standings from "../Standings/Standings";
import TabNavigation from "../TabNavigation";
import Statistics from "./Statistics";
import useGetCompetitionInfo from "../../hooks/useGetCompetitionInfo";

const CompetitionInfo = () => {
  const { competitionId } = useParams();
  const [activeTab, setActiveTab] = useState("matches");
  const location = useLocation();
  const {
    data: competitionInfo,
    isLoading,
    error,
  } = useGetCompetitionInfo(competitionId);

  console.log(competitionInfo);

  const tabs = [
    { key: "matches", label: "Utakmice" },
    { key: "standings", label: "Tablica" },
    { key: "statistics", label: "Statistika" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "matches":
        return <CompetitionMatches competitionId={competitionId} />;
      case "standings":
        return <Standings competitionId={competitionId} />;
      case "statistics":
        return <Statistics competitionId={competitionId} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">
        {competitionInfo?.name}
      </h1>
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default CompetitionInfo;
