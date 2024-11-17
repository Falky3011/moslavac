import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Divider, List } from 'antd';
import { DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { Link } from 'react-router-dom';
import PlayerListItem from './PlayerListItem';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { useGetSeniorCompetition } from '../hooks/useGetSeniorCompetition'

export default function FirstTeam() {
    const [players, setPlayers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('');
    const { data: competition } = useGetSeniorCompetition();


    const { data: searchResults, isLoading } = usePlayerSearch(searchKeyword);

    useEffect(() => {
        const storedPlayers = localStorage.getItem('players');
        if (storedPlayers) {
            setPlayers(JSON.parse(storedPlayers));
        }
    }, []);

    useEffect(() => {
        if (players.length > 0) {
            localStorage.setItem('players', JSON.stringify(players));
        }
    }, [players]);

    const addPlayer = (player) => {
        const updatedPlayers = [...players, { ...player, position: selectedPosition }];
        setPlayers(updatedPlayers);
        setIsModalVisible(false);
        setSearchKeyword('');
    };

    const removePlayer = (playerId) => {
        const updatedPlayers = players.filter(player => player.personId !== playerId);
        setPlayers(updatedPlayers);
    };

    const PlayerCard = ({ player }) => {
        const { data: playerImage } = useGetCometImage(player.picture);

        return (
            <div className="w-36 m-2 bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
                <Link to={`/stats/${player.personId}`} state={{ competition }}>
                    <div className="relative h-36 bg-gray-200">
                        {playerImage ? (
                            <img
                                src={playerImage}
                                alt={player.shortName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <UserOutlined className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>
                </Link>
                <div className="p-2 text-center">
                    <Link to={`/stats/${player.personId}`} className="text-sm font-semibold text-gray-800">
                        {player.shortName}
                    </Link>
                    <br />
                    <DeleteOutlined
                        className="text-red-500 cursor-pointer mt-2"
                        onClick={() => removePlayer(player.personId)}
                    />
                </div>
            </div>
        );
    };

    const renderPositionSection = (title, position) => (
        <div key={position} className="my-4">
            <Divider orientation="left" className="text-lg font-semibold">{title}</Divider>
            <div className="flex flex-wrap">
                {players.filter(p => p.position === position).map(player => (
                    <PlayerCard key={player.personId} player={player} />
                ))}
                <div
                    onClick={() => {
                        setSelectedPosition(position);
                        setIsModalVisible(true);
                    }}
                    className="w-36 h-56 m-2 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                >
                    <PlusOutlined className="text-2xl text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Add {title}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:w-[70%] mx-auto rounded-3xl shadow-lg bg-gray-50 md:my-36">
            <h1 className="text-2xl font-bold text-center mb-8">First Team</h1>

            {renderPositionSection('Vratar', 'goalkeeper')}
            {renderPositionSection('Branič', 'defender')}
            {renderPositionSection('Vezni', 'midfielder')}
            {renderPositionSection('Napradač', 'attacker')}

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
                    loading={isLoading}
                    itemLayout="horizontal"
                    dataSource={searchResults?.result || []}
                    renderItem={(player) => (
                        <PlayerListItem player={player} onAdd={addPlayer} />
                    )}
                />
            </Modal>
        </div>
    );
}
