import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

const MatchLineups = ({ moslavacIsHome, homeTeam, awayTeam, competition, homeTeamImage, awayTeamImage }) => {
    const [activeTab, setActiveTab] = useState('home');

    const filterAndSortPlayers = (players, isStarter) =>
        players
            .filter(player => player.starting === isStarter)
            .sort((a, b) => (a.position === 'G' ? -1 : b.position === 'G' ? 1 : 0));

    const PlayerList = ({ players, isAwayTeam }) => (
        <ul className={`space-y-2 ${isAwayTeam ? 'md:text-right' : ''}`}>
            {players.map(player => {
                const isMoslavac = moslavacIsHome !== isAwayTeam;
                return (
                    <li key={player.personId} className={`flex items-center justify-center ${isAwayTeam ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">{player.shirtNumber}</span>
                            {isMoslavac ? (
                                <Link
                                    to={`/stats/${player.personId}`}
                                    state={{ competition }}
                                    className="hover:underline"
                                >
                                    <span>{player.name}</span>
                                </Link>
                            ) : (
                                <span>{player.name}</span>
                            )}
                            {player.captain && <span className="text-gray-500 text-sm">(C)</span>}
                            {player.position === 'G' && <span className="text-gray-500 text-sm">(GK)</span>}
                        </div>
                    </li>
                );
            })}
        </ul>
    );

    const TeamLineup = ({ team, isAwayTeam }) => (
        <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 md:hidden">Početna postava</h3>
            <PlayerList players={filterAndSortPlayers(team.players, true)} isAwayTeam={isAwayTeam} />
            <Divider plain>
                <h3 className="text-lg font-semibold mt-6 mb-4 md:hidden">Zamjene</h3>
            </Divider>
            <PlayerList players={filterAndSortPlayers(team.players, false)} isAwayTeam={isAwayTeam} />
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden mb-8 mx-auto max-w-4xl">
            {/* Desktop View */}
            <div className="hidden md:block p-6">
                <h3 className="text-xl font-semibold mb-6 text-center">Početna postava</h3>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <PlayerList players={filterAndSortPlayers(homeTeam.players, true)} isAwayTeam={false} />
                    <PlayerList players={filterAndSortPlayers(awayTeam.players, true)} isAwayTeam={true} />
                </div>
                <Divider plain>
                    <h3 className="text-xl font-semibold mb-6 text-center">Zamjene</h3>
                </Divider>
                <div className="grid grid-cols-2 gap-8">
                    <PlayerList players={filterAndSortPlayers(homeTeam.players, false)} isAwayTeam={false} />
                    <PlayerList players={filterAndSortPlayers(awayTeam.players, false)} isAwayTeam={true} />
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-4 px-6 text-center ${activeTab === 'home' ? 'bg-gray-100 font-semibold' : ''}`}
                        onClick={() => setActiveTab('home')}
                    >
                        <img src={homeTeamImage?.data} alt={homeTeam.name} className="w-12 h-12 mx-auto mb-2" />
                        <span>{homeTeam.name}</span>
                    </button>
                    <button
                        className={`flex-1 py-4 px-6 text-center ${activeTab === 'away' ? 'bg-gray-100 font-semibold' : ''}`}
                        onClick={() => setActiveTab('away')}
                    >
                        <img src={awayTeamImage?.data} alt={awayTeam.name} className="w-12 h-12 mx-auto mb-2" />
                        <span>{awayTeam.name}</span>
                    </button>
                </div>
                <div className="p-6">
                    {activeTab === 'home' ? (
                        <TeamLineup team={homeTeam} isAwayTeam={false} />
                    ) : (
                        <TeamLineup team={awayTeam} isAwayTeam={true} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchLineups;
