import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CompetitionMatches from "../CompetitionMatches/CompetitionMatches";
import Standings from "../Standings/Standings";
import TabNavigation from "../TabNavigation";

const CompetitionInfo = () => {
  const { competitionId, competitionName } = useParams();
  const [activeTab, setActiveTab] = useState("matches");

  const tabs = [
    { key: "matches", label: "Utakmice" },
    { key: "standings", label: "Tablica" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "matches":
        return <CompetitionMatches competitionId={competitionId} />;
      case "standings":
        return <Standings competitionId={competitionId} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">
        {decodeURIComponent(competitionName)}
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
