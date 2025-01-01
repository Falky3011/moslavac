import React, { useState } from 'react';
import { Button, Typography, Layout, notification } from 'antd';
import {
    FacebookOutlined,
    YoutubeOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    BellOutlined,
} from '@ant-design/icons';
import grb from '../assets/grb.png';

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function CustomFooter() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNotificationSubscribe = async () => {
        if (!("Notification" in window)) {
            notification.error({ message: "Vaš preglednik ne podržava notifikacije." });
            return;
        }

        if (Notification.permission === "granted") {
            notification.success({ message: "Već ste uključili notifikacije!" });
            return;
        }

        if (Notification.permission !== "denied") {
            try {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    notification.success({ message: "Uspješno ste uključili notifikacije!" });
                    setIsSubscribed(true);
                } else {
                    notification.warning({ message: "Notifikacije su onemogućene." });
                }
            } catch (error) {
                console.error("Error enabling notifications", error);
                notification.error({ message: "Greška pri uključivanju notifikacija." });
            }
        }
    };

    const ContactInfo = () => (
        <div className="transition-all duration-300 ease-in-out hover:translate-y-[-5px]">
            <Title level={3} className="mb-6">Kontakt</Title>
            <ul className="space-y-4">
                <li className="flex items-center">
                    <MailOutlined className="mr-3 text-blue-500" />
                    <a href="mailto:snkmoslavac@gmail.com" className="hover:text-blue-500 transition-colors">
                        snkmoslavac@gmail.com
                    </a>
                </li>
                <li className="flex items-center">
                    <PhoneOutlined className="mr-3 text-blue-500" />
                    <a href="tel:+38512345678" className="hover:text-blue-500 transition-colors">
                        +385 1 234 5678
                    </a>
                </li>
                <li className="flex items-center">
                    <EnvironmentOutlined className="mr-3 text-blue-500" />
                    <Text>Trg Grofa Erdodyja b. b. 44317 Popovača</Text>
                </li>
            </ul>
        </div>
    );

    const AboutUs = () => (
        <div className="transition-all duration-300 ease-in-out hover:translate-y-[-5px]">
            <Title level={3} className="mb-6">O nama</Title>
            <Text>
                SNK Moslavac je sportski klub posvećen promicanju atletike, timskog rada i zajedništva.
                Osnovan 1933. godine, imamo bogatu povijest njegovanja talenata i ljubavi prema sportu u Popovači i šire.
            </Text>
        </div>
    );

    const Notifications = () => (
        <div className="transition-all duration-300 ease-in-out hover:translate-y-[-5px]">
            <Title level={3} className="mb-6">Obavijesti</Title>
            <Text className="mb-4 block">
                Kliknite ispod i primajte najnovije vijesti i obavijesti!
            </Text>
            <Button
                type="primary"
                icon={<BellOutlined />}
                className="bg-blue-500 hover:bg-blue-600 transition-colors"
                onClick={handleNotificationSubscribe}
                disabled={isSubscribed}
            >
                {isSubscribed ? "Obavijesti uključene" : "Uključi obavijesti"}
            </Button>
        </div>
    );

    return (
        <Footer className="bg-gray-100 text-gray-600 mt-20">
            <div className="container mx-auto px-4 py-16">
                {/* Logo and Motto */}
                <div className="flex flex-col items-center mb-16 space-y-8">
                    <div className="relative group">
                        <img
                            src={grb}
                            alt="Club Crest"
                            className="w-[180px] h-[180px] z-10 relative transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/10 rounded-full filter blur-xl transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                    <div className="text-center">
                        <Title level={2} className="mb-3 font-serif italic tracking-wide" style={{ color: '#1890ff' }}>
                            Ovdje nitko nije normalan
                        </Title>
                        <div className="h-0.5 w-24 bg-blue-500 mx-auto rounded-full transition-all duration-500 ease-in-out group-hover:w-32"></div>
                    </div>
                </div>

                {/* Contact, About, Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <ContactInfo />
                    <AboutUs />
                    <Notifications />
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Text className="text-center md:text-left text-sm">
                            &copy; {new Date().getFullYear()} SNK Moslavac. Sva prava pridržana. Dizajn i razvoj web stranice: Adriano Faletar
                        </Text>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="https://www.facebook.com/SNKMoslavacPopovaca"
                                aria-label="Facebook"
                                className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                            >
                                <FacebookOutlined className="text-2xl hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="https://www.youtube.com/@SNKMoslavacPopovaca"
                                aria-label="YouTube"
                                className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                            >
                                <YoutubeOutlined className="text-2xl hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Footer>
    );
}
