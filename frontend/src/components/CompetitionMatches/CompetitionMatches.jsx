import React from 'react';
import { List, Typography, Divider, Spin, Alert } from 'antd';
import useGetAllCompetitionMatches from '../../hooks/useGetAllCompetitionMatches';
import { groupAndSortMatches } from '../../utils/matchUtils';
import MatchItem from './MatchItem/MatchItem';

const CompetitionMatches = ({ competitionId }) => {
    const { data, error, isLoading } = useGetAllCompetitionMatches(competitionId);

    if (isLoading) {
        return <Spin size="large" className="flex justify-center items-center h-64" />;
    }

    if (error) {
        return <Alert message="Error fetching matches" type="error" className="mx-4" />;
    }

    const { grouped: matchesByMonth, sortedMonths } = groupAndSortMatches(data);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 shadow-md rounded-3xl">
            {sortedMonths.map((month) => (
                <div key={month} className="mb-6">
                    <Typography.Title level={4} className="text-base sm:text-lg font-bold text-gray-800 uppercase">
                        {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
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
