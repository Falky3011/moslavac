import React from 'react';
import { useParams } from 'react-router-dom';
import { List, Spin, Alert } from 'antd';
import { useGetCompetitionPlayers } from '../hooks/useGetCompetitionPlayers';
import PlayerItem from './PlayerItem';

const PlayersList = () => {
    const { id: competitionId } = useParams();
    const { data: players, isLoading, isError } = useGetCompetitionPlayers(competitionId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin tip="Loading..." />
            </div>
        );
    }

    if (isError) {
        return (
            <Alert message="Error" description="Došlo je do pogreške prilikom dohvaćanja igrača." type="error" className="mb-4" />
        );
    }

    return (
        <div className="overflow-x-auto bg-gray-50 shadow-md rounded-lg p-6 max-w-3xl mx-auto my-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Lista Igrača</h2>
            <List
                dataSource={players}
                renderItem={player => (
                    <List.Item className="py-2">
                        <PlayerItem playerId={player.personId} competitionId={competitionId} />
                    </List.Item>
                )}
                style={{ borderCollapse: 'collapse' }}
                className="table-auto"
            />
        </div>
    );
};

export default PlayersList;
