import React from "react";
import { Card, Typography, Space, List, Row, Col } from 'antd';
import { FaFutbol, FaSquareFull } from 'react-icons/fa';
import { SwapOutlined } from '@ant-design/icons';
import GoalEvent from './GoalEvent';

const { Text } = Typography;

const MatchEvents = ({ moslavacIsHome, matchEvents }) => {


    const formatEventTime = (minuteFull, stoppageTime) => {
        return stoppageTime ? `${minuteFull}+${stoppageTime}` : `${minuteFull}'`;
    };

    const renderEvent = (event) => {
        const isMoslavacEvent = (moslavacIsHome && event.homeTeam) || (!moslavacIsHome && !event.homeTeam);
        const eventStyle = isMoslavacEvent ? { color: '#1890ff' } : { color: 'rgba(0, 0, 0, 0.45)' };
        const eventContent = (() => {
            switch (event.eventType.fcdName) {
                case 'START':
                    return event.matchPhase.fcdName === 'FIRST_HALF' ? <Text strong>POČETAK</Text> : null;
                case 'END':
                    return event.matchPhase.fcdName === 'FIRST_HALF' ? <Text strong>POLUVRIJEME</Text> : null;
                case 'GOAL':
                case 'PENALTY':
                    return <GoalEvent event={event} isMoslavacEvent={isMoslavacEvent} isOwnGoal={false} />;
                case 'OWN_GOAL':
                    return <GoalEvent event={event} isMoslavacEvent={isMoslavacEvent} isOwnGoal={true} />;

                case 'YELLOW':
                    return (
                        <Space>
                            <FaSquareFull className="text-yellow-500" />
                            <Text strong style={eventStyle}>
                                {event?.player?.name || event?.teamOfficial?.name} {formatEventTime(event.minuteFull, event.stoppageTime)}
                            </Text>
                        </Space>
                    )
                case 'SECOND_YELLOW':
                    return (
                        <Space>
                            <div className="relative inline-block">
                                <FaSquareFull className="text-yellow-500" />
                                <FaSquareFull className="text-red-500 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4" />
                            </div>
                            {event?.player?.name || event?.teamOfficial?.name} {formatEventTime(event.minuteFull, event.stoppageTime)}
                        </Space>
                    );
                case 'RED':
                    return (
                        <Space>
                            <FaSquareFull className="text-red-500" />
                            {event?.player?.name || event?.teamOfficial?.name} {formatEventTime(event.minuteFull, event.stoppageTime)}
                        </Space>
                    );
                case 'SUBSTITUTION':
                    return (
                        <Space>
                            <SwapOutlined />
                            <Text strong style={eventStyle}>{event.player.name}</Text>
                            <Text style={eventStyle}>{event.player2.name} {formatEventTime(event.minuteFull, event.stoppageTime)}</Text>
                        </Space>
                    );
                case 'FULL_TIME':
                    return (
                        <Text strong>KRAJ</Text>
                    )
                default:
                    return null;
            }
        })();
        if (!eventContent) return null;


        const rowJustify = event.homeTeam === undefined ? "center" : event.homeTeam ? "start" : "end";
        const textAlign = event.homeTeam === undefined ? "text-center" : event.homeTeam ? "text-left" : "text-right";

        return (
            <Row justify={rowJustify} className="w-full">
                <Col className={textAlign}>
                    {eventContent}
                </Col>
            </Row>
        );
    };

    return (
        <Card className="mb-8 md:max-w-[70%] mx-auto bg-gray-50 shadow-lg rounded-lg border-gray-200">
            <List
                dataSource={matchEvents}
                renderItem={(event) => {
                    const eventContent = renderEvent(event);
                    if (!eventContent) return null;
                    return <List.Item>{eventContent}</List.Item>;
                }}

            />
        </Card>
    );
};

export default MatchEvents;
