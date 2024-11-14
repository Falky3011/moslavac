import React from "react";
import { Card, Typography, Space, Row, Col, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MatchLineups = ({ homeTeam, awayTeam }) => {

    const renderStarters = (players, isAwayTeam) => {
        const starters = players.filter(p => p.starting).sort((a, b) => {
            if (a.position === 'G') return -1;
            if (b.position === 'G') return 1;
            return 0;
        });

        return (
            <List
                dataSource={starters}
                renderItem={player => (
                    <List.Item style={{ justifyContent: `${isAwayTeam ? 'end' : 'start'}` }}>
                        <Space>
                            <UserOutlined />
                            <Text strong>{player.shirtNumber}</Text>
                            <Text>{player.name}</Text>
                            {player.captain && <Text type="secondary">(C)</Text>}
                            {player.position === 'G' && <Text type="secondary">(GK)</Text>}
                        </Space>
                    </List.Item>
                )}
            />
        );
    };

    const renderSubstitutes = (players, isAwayTeam) => {
        const substitutes = players.filter(p => !p.starting);

        return (
            <List
                dataSource={substitutes}
                renderItem={player => (
                    <List.Item style={{ justifyContent: `${isAwayTeam ? 'end' : 'start'}` }}>
                        <Space>
                            <UserOutlined />
                            <Text strong>{player.shirtNumber}</Text>
                            <Text>{player.name}</Text>
                        </Space>
                    </List.Item>
                )}
            />
        );
    };

    return (
        <Card className="mb-8 md:max-w-[70%] mx-auto bg-gray-50 shadow-lg rounded-lg border-gray-200">
            <Row gutter={16} justify="center" className="text-center">
                <Col span={24}>
                    <Title level={5}>Početna postava</Title>
                </Col>
                <Col span={12}>
                    {renderStarters(homeTeam.players, false)}
                </Col>
                <Col span={12}>
                    {renderStarters(awayTeam.players, true)}
                </Col>

                <Col span={24}>
                    <Title level={5} className="mt-4">Zamjene</Title>
                </Col>
                <Col span={12}>
                    {renderSubstitutes(homeTeam.players, false)}
                </Col>
                <Col span={12}>
                    {renderSubstitutes(awayTeam.players, true)}
                </Col>
            </Row>
        </Card>
    );
};

export default MatchLineups;
