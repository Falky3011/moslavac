import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

const MatchLineups = ({ moslavacIsHome, homeTeam, awayTeam, competition, homeTeamImage, awayTeamImage }) => {
    const [activeTab, setActiveTab] = useState('home');

    const renderPlayers = (players, isStarter, isAwayTeam) => {
        const moslavac = moslavacIsHome !== isAwayTeam;
        const filteredPlayers = players.filter(p => p.starting === isStarter).sort((a, b) => {
            if (a.position === 'G') return -1;
            if (b.position === 'G') return 1;
            return 0;
        });

        return (
            <ul className={`space-y-2 ${isAwayTeam ? 'md:text-right' : ''}`}>
                {filteredPlayers.map(player => (
                    <li key={player.personId} className={`flex items-center justify-center ${isAwayTeam ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">{player.shirtNumber}</span>
                            {moslavac ? (
                                <Link to={`/stats/${player.personId}`} state={{ competition }} className="hover:underline">
                                    <span>{player.name}</span>
                                </Link>
                            ) : (
                                <span>{player.name}</span>
                            )}
                            {player.captain && <span className="text-gray-500 text-sm">(C)</span>}
                            {player.position === 'G' && <span className="text-gray-500 text-sm">(GK)</span>}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const renderTeamLineup = (team, isAwayTeam) => (
        <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 md:hidden">Početna postava</h3>
            {renderPlayers(team.players, true, isAwayTeam)}
            <Divider plain>
                <h3 className="text-lg font-semibold mt-6 mb-4 md:hidden">Zamjene</h3>
            </Divider>
            {renderPlayers(team.players, false, isAwayTeam)}
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden mb-8 mx-auto max-w-4xl">
            <div className="hidden md:block p-6">
                <h3 className="text-xl font-semibold mb-6 text-center">Početna postava</h3>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="w-full">{renderPlayers(homeTeam.players, true, false)}</div>
                    <div className="w-full">{renderPlayers(awayTeam.players, true, true)}</div>
                </div>
                <Divider plain>
                    <h3 className="text-xl font-semibold mb-6 text-center">Zamjene</h3>
                </Divider>
                <div className="grid grid-cols-2 gap-8">
                    <div className="w-full">{renderPlayers(homeTeam.players, false, false)}</div>
                    <div className="w-full">{renderPlayers(awayTeam.players, false, true)}</div>
                </div>
            </div>

            <div className="md:hidden">
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-4 px-6 text-center ${activeTab === 'home' ? 'bg-gray-100 font-semibold' : ''}`}
                        onClick={() => setActiveTab('home')}
                    >
                        <img src={homeTeamImage?.image} alt={homeTeam.name} className="w-12 h-12 mx-auto mb-2" />
                        <span>{homeTeam.name}</span>
                    </button>
                    <button
                        className={`flex-1 py-4 px-6 text-center ${activeTab === 'away' ? 'bg-gray-100 font-semibold' : ''}`}
                        onClick={() => setActiveTab('away')}
                    >
                        <img src={awayTeamImage?.image} alt={awayTeam.name} className="w-12 h-12 mx-auto mb-2" />
                        <span>{awayTeam.name}</span>
                    </button>
                </div>
                <div className="p-6">
                    {activeTab === 'home' ? renderTeamLineup(homeTeam, false) : renderTeamLineup(awayTeam, true)}
                </div>
            </div>
        </div>
    );
};

export default MatchLineups;