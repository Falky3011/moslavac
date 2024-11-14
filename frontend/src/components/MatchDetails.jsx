import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Typography, Space, Row, Col, List } from 'antd'
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

    console.log(matchInfo)

    const homeTeamImage = useGetCometImage(matchInfo?.homeTeam?.picture)
    const awayTeamImage = useGetCometImage(matchInfo?.awayTeam?.picture)

    useEffect(() => {
        if (matchInfo) {
            setMoslavacIsHome(matchInfo.homeTeam.name === "SNK Moslavac")
        }
    }, [matchInfo])

    if (!matchInfo || !matchEvents || !matchLineups || !matchReferees) {
        return <div>Loading...</div>
    }

    const { homeTeam, awayTeam, dateTimeUTC, round, competition } = matchInfo

    return (
        <div className="container mx-auto px-4 py-8 w-4/5">
            <Card className="mb-8 bg-gray-50 shadow-lg rounded-lg">
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
                            <Title level={4}>{competition.name}</Title>
                        </Col>
                    </Row>

                    <Row justify="space-between" align="middle">
                        <Col>
                            <Space direction="vertical" align="center">
                                <img
                                    src={homeTeamImage.data}
                                    alt={homeTeam.name}
                                    className="w-16 h-16"
                                />
                                <Text strong>{homeTeam.name}</Text>
                            </Space>
                        </Col>
                        <Col className="flex flex-col items-center">
                            <Title level={2}>
                                {matchInfo.homeTeamResult?.current} - {matchInfo.awayTeamResult?.current}
                            </Title>
                        </Col>
                        <Col>
                            <Space direction="vertical" align="center">
                                <img
                                    src={awayTeamImage.data}
                                    alt={awayTeam.name}
                                    className="w-16 h-16"
                                />
                                <Text strong>{awayTeam.name}</Text>
                            </Space>
                        </Col>
                    </Row>

                    {/* Dodajemo listu sudaca ovdje */}
                    <Row justify="center">
                        <Col>
                            <List
                                split={false}
                                dataSource={matchReferees.matchOfficials.filter(official => official.role !== "Delegat")}
                                renderItem={(official) => (
                                    <List.Item className=" flex justify-center">
                                        <Text className="text-center mx-auto font-semibold">{official.name} - {official.role}</Text>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Space>
            </Card>

            <MatchInfo moslavacIsHome={moslavacIsHome} matchEvents={matchEvents} homeTeam={matchLineups.home} awayTeam={matchLineups.away} />
        </div>
    )
}