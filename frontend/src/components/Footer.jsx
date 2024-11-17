import React from 'react';
import { Input, Button } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground mt-10 bg-gray-100">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Klub</h3>
                        <ul className="space-y-2">
                            <li><Link to="/ulaznice">Ulaznice</Link></li>
                            <li><Link to="/clanstvo">Službene osobe</Link></li>
                            <li><Link to="/navijacka-zona">Treneri</Link></li>
                            <li><Link to="/fan-shop">Webshop</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <MailOutlined className="mr-2" />
                                <a href="mailto:snkmoslavac@gmail.com">snkmoslavac@gmail.com</a>
                            </li>
                            <li className="flex items-center">
                                <PhoneOutlined className="mr-2" />
                                <a href="tel:+38512345678">+385 1 234 5678</a>
                            </li>
                            <li className="flex items-center">
                                <EnvironmentOutlined className="mr-2" />
                                <address>Trg Grofa Erdodyja b. b. 44317 Popovača</address>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Obavijesti</h3>
                        <p className="mb-4">Budite u toku s najnovijim vijestima i obavijestima</p>
                        <form className="space-y-2">
                            <Input placeholder="Vaša email adresa" className="bg-primary-foreground text-primary" />
                            <Button type="primary" className="w-full mt-2">Potvrdi</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-primary-foreground/10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-center md:text-left">&copy; {new Date().getFullYear()} SNK Moslavac. Sva prava pridržana. Dizajn i razvoj web stranice: Adriano Faletar</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-primary-foreground/80">
                                <FacebookOutlined className="text-xl" />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-primary-foreground/80">
                                <InstagramOutlined className="text-xl" />
                            </a>
                            <a href="https://youtube.com" aria-label="YouTube" className="hover:text-primary-foreground/80">
                                <YoutubeOutlined className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}