import React, { useState } from 'react';
import { Button, Input, Modal, Divider, List, message } from 'antd';
import { useGetPlayers, useAddPlayer, useDeletePlayer } from '../../hooks/usePlayer';
import { usePlayerSearch } from '../../hooks/usePlayerSearch';
import { useAdminAuth } from '../../utils/adminUtils';
import PlayerCard from './PlayerCard';
import AddPlayerButton from './AddPlayerButton';
import PlayerListItem from './PlayerListItem';

export default function FirstTeam() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    const { data: players = [] } = useGetPlayers();
    const { data: searchResults = [], isLoading: loadingSearch } = usePlayerSearch(searchKeyword);
    const { mutate: addPlayer } = useAddPlayer();
    const { mutate: deletePlayer } = useDeletePlayer();
    const { isAdmin, AdminAuthModal } = useAdminAuth();

    const handleAddPlayer = (player) => {
        addPlayer({ ...player, position: selectedPosition }, {
            onSuccess: () => {
                message.success('Player added successfully');
                setIsModalVisible(false);
                setSearchKeyword('');
            },
            onError: () => message.error('Failed to add player'),
        });
    };

    const handleRemovePlayer = (playerId) => {
        deletePlayer(playerId, {
            onSuccess: () => message.success('Player removed successfully'),
            onError: () => message.error('Failed to remove player'),
        });
    };

    const renderPositionSection = (title, position) => (
        <div key={position} className="my-4">
            <Divider orientation="left" className="text-lg font-semibold">{title}</Divider>
            <div className="flex flex-wrap">
                {players
                    .filter((p) => p.position === position)
                    .map((player) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            isAdmin={isAdmin}
                            onRemove={handleRemovePlayer}
                        />
                    ))}
                {isAdmin && (
                    <AddPlayerButton
                        title={title}
                        onClick={() => {
                            setSelectedPosition(position);
                            setIsModalVisible(true);
                        }}
                    />
                )}
            </div>
        </div>
    );

    return (
        <div className="p-6 md:w-[70%] mx-auto rounded-3xl shadow-md bg-gray-50 my-8">
            <h1 className="text-2xl font-bold text-center mb-8">Momčad</h1>
            {['goalkeeper', 'defender', 'midfielder', 'attacker'].map((position) =>
                renderPositionSection(
                    position.charAt(0).toUpperCase() + position.slice(1),
                    position
                )
            )}
            <Modal
                title="Add Player"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Input
                    placeholder="Search for a player"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="mb-4"
                />
                <List
                    loading={loadingSearch}
                    itemLayout="horizontal"
                    dataSource={searchResults?.result || []}
                    renderItem={(player) => (
                        <PlayerListItem player={player} onAdd={handleAddPlayer} />
                    )}
                />
            </Modal>
            <AdminAuthModal />
        </div>
    );
}
