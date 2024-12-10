import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetMatchInfo } from '../hooks/useGetMatchInfo'
import { useGetMatchEvents } from '../hooks/useGetMatchEvents'
import { useGetMatchLineups } from '../hooks/useGetMatchLineups'
import { useGetMatchReferees } from '../hooks/useGetMatchReferees'
import { useGetCometImage } from '../hooks/useGetCometImage'
import MatchInfo from './MatchInfo'

export default function MatchDetails() {
    const { matchId } = useParams()
    const [moslavacIsHome, setMoslavacIsHome] = useState(false)

    const { data: matchInfo } = useGetMatchInfo(matchId)
    const { data: matchEvents } = useGetMatchEvents(matchId)
    const { data: matchLineups } = useGetMatchLineups(matchId)
    const { data: matchReferees } = useGetMatchReferees(matchId)

    const homeTeamImage = useGetCometImage(matchInfo?.homeTeam?.picture)
    const awayTeamImage = useGetCometImage(matchInfo?.awayTeam?.picture)

    useEffect(() => {
        if (matchInfo) {
            setMoslavacIsHome(matchInfo.homeTeam.name === "SNK Moslavac")
        }
    }, [matchInfo])

    if (!matchInfo || !matchEvents || !matchLineups || !matchReferees) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    const { homeTeam, awayTeam, dateTimeUTC, round, competition } = matchInfo

    return (
        <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <span className="text-xs sm:text-sm font-medium mb-2 sm:mb-0">{new Date(dateTimeUTC).toLocaleDateString()}</span>
                        <span className="text-xs sm:text-sm font-bold">Kolo {round}</span>
                    </div>
                    <Link to={`/season/${competition.id}/${encodeURIComponent(competition.name)}`} className="block text-center">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4">{competition.name}</h1>
                    </Link>
                    <div className="flex items-center justify-center sm:justify-between">
                        <div className="flex-1 text-center">
                            <img
                                src={homeTeamImage.data}
                                alt={homeTeam.name}
                                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-white p-1 sm:p-2"
                            />
                            <span className="font-semibold text-xs sm:text-sm">{homeTeam.name}</span>
                        </div>
                        <div className="flex-shrink-0 text-2xl sm:text-4xl font-bold mx-4">
                            {matchInfo.homeTeamResult?.current} - {matchInfo.awayTeamResult?.current}
                        </div>
                        <div className="flex-1 text-center">
                            <img
                                src={awayTeamImage.data}
                                alt={awayTeam.name}
                                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-white p-1 sm:p-2"
                            />
                            <span className="font-semibold text-xs sm:text-sm">{awayTeam.name}</span>
                        </div>
                    </div>

                </div>
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col gap-2">
                        {matchReferees.matchOfficials
                            .filter(official => official.role !== "Delegat")
                            .map((official, index) => (
                                <div key={index} className="bg-gray-100 rounded-lg p-2 sm:p-3 flex justify-between items-center">
                                    <span className="font-medium text-sm sm:text-base">{official.name}</span>
                                    <span className="text-gray-600 text-xs sm:text-sm">{official.role}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div >
                <MatchInfo
                    moslavacIsHome={moslavacIsHome}
                    matchEvents={matchEvents}
                    homeTeam={matchLineups.home}
                    awayTeam={matchLineups.away}
                    competition={matchInfo.competition}
                    homeTeamImage={homeTeamImage}
                    awayTeamImage={awayTeamImage}
                />
            </div>
        </div>
    )
}

