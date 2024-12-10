import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Dropdown, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined, DownOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useGetCurrentSeasonCompetitions } from '../hooks/useGetCurrentSeasonCompetitions';
import logo from '../assets/grb.png';

const { Header } = Layout;

export default function CustomHeader() {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { data: competitions, isLoading } = useGetCurrentSeasonCompetitions();


    const y = useSpring(0, { stiffness: 1000, damping: 100, mass: 1 });
    const height = useTransform(y, [0, 100], [100, 64]);
    const logoSize = useTransform(y, [0, 100], [80, 48]);
    const headerOpacity = useTransform(y, [0, 100], [1, 0.98]);
    // const headerBlur = useTransform(y, [0, 100], [0, 8]);
    const socialIconsOpacity = useTransform(y, [0, 50], [1, 0]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setVisible(false);
            }
        };

        const handleScroll = () => {
            y.set(window.scrollY);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        handleResize();
        handleScroll();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [y]);

    const seasonDropdownMenu = (
        <Menu>
            {isLoading ? (
                <Menu.Item key="loading" disabled>
                    <Spin size="small" /> Učitavanje natjecanja...
                </Menu.Item>
            ) : (
                competitions?.map((comp) => (
                    <Menu.Item key={comp.id}>
                        <Link
                            to={`/season/${comp.id}/${encodeURIComponent(comp.name)}`}
                            onClick={() => setVisible(false)}>{comp.name}</Link>
                    </Menu.Item>
                ))
            )}
        </Menu>
    );

    const menuItems = [
        { key: 'news', label: 'Vijesti', to: '/news' },
        {
            key: 'season',
            label: (
                <Dropdown overlay={seasonDropdownMenu} trigger={['click']}>
                    <span className="flex items-center cursor-pointer">
                        Sezona <DownOutlined className="ml-1 text-sm" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }} />
                    </span>
                </Dropdown>
            ),
        },
        { key: 'matches', label: 'Utakmice', to: '/matches' },
        { key: 'first-team', label: 'Momčad', to: '/first-team' },
        { key: 'webshop', label: 'Webshop', to: 'https://alpashrvatska.hr/snk-moslavac-popovaca/' },
    ];

    const renderMenuItems = () => (
        <>
            {menuItems.map((item) => (
                <Menu.Item key={item.key}>
                    {item.to ? <Link to={item.to} onClick={() => setVisible(false)}>{item.label}</Link> : item.label}
                </Menu.Item>
            ))}
        </>
    );

    return (
        <motion.div
            style={{
                height,
                opacity: headerOpacity,
            }}
            className="sticky top-0 z-50 w-full"
        >
            <Header className="h-full bg-white border-b border-gray-300 shadow-xl px-4">
                <div className="max-w-screen-xl mx-auto flex items-center h-full relative">
                    {isMobile && (
                        <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: '20px' }} />}
                            onClick={() => setVisible(true)}
                            className="p-0 absolute left-4 z-50"
                        />
                    )}
                    <Link
                        to="/"
                        className={`flex items-center ${isMobile ? 'mx-auto' : 'mr-8 ml-36'}`}
                    >
                        <motion.img
                            src={logo}
                            alt="Klub Grb"
                            style={{ height: logoSize }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    </Link>
                    {!isMobile && (
                        <div className="flex-grow flex justify-between items-center">
                            <Menu mode="horizontal" className="border-0 flex space-x-4">
                                {renderMenuItems()}
                            </Menu>
                            <motion.div
                                className="flex items-center space-x-4"
                                style={{ opacity: socialIconsOpacity }}
                            >
                                <motion.a
                                    href="https://www.facebook.com/SNKMoslavacPopovaca"
                                    aria-label="Facebook"
                                    className="text-primary-foreground hover:text-accent"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                >
                                    <FacebookOutlined className="text-2xl" />
                                </motion.a>
                                <motion.a
                                    href="https://www.youtube.com/@SNKMoslavacPopovaca"
                                    aria-label="YouTube"
                                    className="text-primary-foreground hover:text-accent"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                >
                                    <YoutubeOutlined className="text-2xl" />
                                </motion.a>

                            </motion.div>
                        </div>
                    )}
                </div>
                <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setVisible(false)}
                    visible={visible}
                    bodyStyle={{ padding: 0 }}
                    className="drawer-menu"
                >
                    <Menu mode="vertical" className="border-0">
                        {renderMenuItems()}
                    </Menu>
                </Drawer>
            </Header>
        </motion.div>
    );
}

