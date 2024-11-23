import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Dropdown, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import logo from '../assets/grb.png';
import { useGetCurrentSeasonCompetitions } from '../hooks/useGetCurrentSeasonCompetitions';

const { Header } = Layout;

export default function CustomHeader() {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [scrolling, setScrolling] = useState(false);
    const { data: competitions, isLoading } = useGetCurrentSeasonCompetitions();


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setVisible(false);
            }
        };

        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const seasonDropdownMenu = (
        <Menu>
            {isLoading ? (
                <Menu.Item key="loading" disabled>
                    <Spin size="small" /> Učitavanje natjecanja...
                </Menu.Item>
            ) : (
                competitions.map((comp) => (
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
        { key: 'first-team', label: 'Momčad', to: '/first-team' }, // Dodan novi navigacijski dio za Momčad
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
        <Header className={`sticky top-0 z-50 h-auto ${isMobile ? 'bg-black' : 'bg-white border-b border-gray-300 shadow-xl'} px-0 transition-all duration-300`}>
            <div className={`max-w-screen-xl mx-auto flex items-center h-full relative py-4 ${scrolling ? 'py-4' : 'py-4'} transition-all duration-300`}>
                {isMobile && (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: 'white', fontSize: '20px' }} />}
                        onClick={() => setVisible(true)}
                        className="p-0 absolute left-4"
                    />
                )}
                <Link to="/" className={`flex items-center ${isMobile ? 'mx-auto' : 'mr-8 ml-56'}`}>
                    <img
                        src={logo}
                        alt="Klub Grb"
                        className={`transition-all duration-300 ${scrolling ? 'h-12' : 'h-20'}`}
                    />
                </Link>
                {!isMobile && (
                    <Menu mode="horizontal" className="border-0 bg-transparent flex space-x-4">
                        {renderMenuItems()}
                    </Menu>
                )}
            </div>
            <Drawer
                title="Menu"
                placement="left"
                onClose={() => setVisible(false)}

                visible={visible}
                bodyStyle={{ padding: 0 }}
            >
                <Menu mode="vertical" className="border-0">
                    {renderMenuItems()}
                </Menu>
            </Drawer>
        </Header>
    );
}
