import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Typography, Space, Row, Col, List, Spin } from 'antd'
import { useGetMatchInfo } from '../hooks/useGetMatchInfo'
import { useGetMatchEvents } from '../hooks/useGetMatchEvents'
import { useGetMatchLineups } from '../hooks/useGetMatchLineups'
import { useGetMatchReferees } from '../hooks/useGetMatchReferees'
import { useGetCometImage } from '../hooks/useGetCometImage'
import MatchInfo from './MatchInfo'

const { Title, Text } = Typography

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
        return <Spin size="large" className="flex justify-center items-center h-screen" />
    }

    const { homeTeam, awayTeam, dateTimeUTC, round, competition } = matchInfo

    return (
        <div className="container mx-auto px-4 py-4 sm:py-8 w-full sm:w-11/12 md:w-4/5 lg:w-3/4">
            <Card className="mb-4 sm:mb-8 bg-gray-50 shadow-md sm:shadow-lg rounded-2xl sm:rounded-3xl">
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Text type="secondary">
                                {new Date(dateTimeUTC).toLocaleDateString()}
                            </Text>
                        </Col>
                        <Col>
                            <Text strong>Kolo {round}</Text>
                        </Col>
                    </Row>

                    <Row justify="center" align="middle">
                        <Col>
                            <Link to={`/season/${competition.id}/${encodeURIComponent(competition.name)}`}>
                                <Title level={4} className="text-center">{competition.name}</Title>
                            </Link>
                        </Col>
                    </Row>

                    <Row justify="space-between" align="middle" gutter={[16, 16]}>
                        <Col xs={24} sm={8} className="text-center">
                            <Space direction="vertical" align="center">
                                <img
                                    src={homeTeamImage.data}
                                    alt={homeTeam.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16"
                                />
                                <Text strong>{homeTeam.name}</Text>
                            </Space>
                        </Col>
                        <Col xs={24} sm={8} className="text-center">
                            <Title level={2}>
                                {matchInfo.homeTeamResult?.current} - {matchInfo.awayTeamResult?.current}
                            </Title>
                        </Col>
                        <Col xs={24} sm={8} className="text-center">
                            <Space direction="vertical" align="center">
                                <img
                                    src={awayTeamImage.data}
                                    alt={awayTeam.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16"
                                />
                                <Text strong>{awayTeam.name}</Text>
                            </Space>
                        </Col>
                    </Row>

                    <Row justify="center">
                        <Col>
                            <List
                                size="small"
                                split={false}
                                dataSource={matchReferees.matchOfficials.filter(official => official.role !== "Delegat")}
                                renderItem={(official) => (
                                    <List.Item className="flex justify-center">
                                        <Text className="text-center mx-auto font-semibold text-xs sm:text-sm">{official.name} - {official.role}</Text>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Space>
            </Card>

            <MatchInfo
                moslavacIsHome={moslavacIsHome}
                matchEvents={matchEvents}
                homeTeam={matchLineups.home}
                awayTeam={matchLineups.away}
                competition={matchInfo.competition}
                homeTeamImage={homeTeamImage}
                awayTeamImage={awayTeamImage}
            />
        </div >
    )
}