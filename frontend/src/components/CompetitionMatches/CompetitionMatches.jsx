import React from "react";
import { List, Typography, Divider, Spin, Alert } from "antd";
import useGetAllCompetitionMatches from "../../hooks/useGetAllCompetitionMatches";
import { groupAndSortMatches } from "../../utils/matchUtils";
import MatchItem from "./MatchItem/MatchItem";

const CompetitionMatches = ({ competitionId }) => {
  const { data, error, isLoading } = useGetAllCompetitionMatches(competitionId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="small" tip="Učitavanje utakmica..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert
          message="Greška"
          description="Došlo je do pogreške prilikom dohvaćanja utakmica. Pokušajte ponovno kasnije."
          type="error"
          showIcon
        />
      </div>
    );
  }

  const { grouped: matchesByMonth, sortedMonths } = groupAndSortMatches(data);

  if (!data || data.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert
          message="Nema utakmica"
          description="Trenutno nema dostupnih utakmica za ovo natjecanje."
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-3xl">
      {sortedMonths.map((month) => (
        <div key={month} className="mb-6">
          <Typography.Title
            level={4}
            className="text-base sm:text-lg font-bold text-gray-800 uppercase"
          >
            {new Date(`${month}-01`).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Typography.Title>
          <Divider className="my-2 sm:my-4" />
          <List
            itemLayout="horizontal"
            dataSource={matchesByMonth[month]}
            renderItem={(match) => <MatchItem match={match} />}
          />
        </div>
      ))}
    </div>
  );
};

export default CompetitionMatches;
