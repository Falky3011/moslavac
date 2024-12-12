// src/components/CompetitionMatches/CompetitionMatches.jsx
import React from 'react';
import { List, Typography, Divider, Spin, Alert } from 'antd';
import MatchItem from './MatchItem';
import useGetAllCompetitionMatches from '../hooks/useGetAllCompetitionMatches';

const CompetitionMatches = ({ competitionId }) => {
    const { data, error, isLoading } = useGetAllCompetitionMatches(competitionId);



    const groupMatchesByMonth = (matches) => {
        return matches.reduce((acc, match) => {
            const date = new Date(match.dateTimeUTC);
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(match);
            return acc;
        }, {});
    };

    const sortMatchesByDate = (matches) => {
        return matches.sort((a, b) => new Date(a.dateTimeUTC) - new Date(b.dateTimeUTC));
    };

    const sortMonthsAscending = (matchesByMonth) => {
        return Object.keys(matchesByMonth).sort((a, b) => {
            const [yearA, monthA] = a.split('-').map(Number);
            const [yearB, monthB] = b.split('-').map(Number);
            return yearA - yearB || monthA - monthB;
        });
    };

    if (isLoading) return <Spin size="large" />;
    if (error) return <Alert message="Error fetching matches" type="error" />;

    const matchesByMonth = groupMatchesByMonth(data);

    Object.keys(matchesByMonth).forEach(month => {
        matchesByMonth[month] = sortMatchesByDate(matchesByMonth[month]);
    });

    const sortedMonths = sortMonthsAscending(matchesByMonth);

    return (
        <div className="max-w-full mx-auto p-4  shadow-md rounded-3xl md:max-w-[75%]">
            {sortedMonths.map((month) => (
                <div key={month} className="mb-6">
                    <Typography.Title level={4} className="text-lg font-bold text-gray-800 uppercase">
                        {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </Typography.Title>
                    <Divider />
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
