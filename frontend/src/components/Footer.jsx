import React from 'react';
import { Input, Button } from 'antd';
import { FacebookOutlined, YoutubeOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import grb from '../assets/grb.png';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-primary-foreground mt-10">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center mb-12 space-y-6">
                    <div className="relative group">
                        <img
                            src={grb}
                            alt="Club Crest"
                            className="w-[150px] h-[150px] z-10 relative transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-md transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-accent mb-2 font-serif italic tracking-wide">
                            Ovdje nitko nije normalan
                        </h2>
                        <div className="h-1 w-20 bg-accent mx-auto rounded-full transition-all duration-500 ease-in-out hover:w-32"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="transition-all duration-300 ease-in-out hover:translate-y-[-5px]">
                        <h3 className="text-xl font-semibold mb-4 text-accent">Klub</h3>
                        <ul className="space-y-2">
                            <li><Link to="/ulaznice" className="hover:text-accent transition-colors">Ulaznice</Link></li>
                            <li><Link to="/clanstvo" className="hover:text-accent transition-colors">Službene osobe</Link></li>
                            <li><Link to="/navijacka-zona" className="hover:text-accent transition-colors">Treneri</Link></li>
                            <li><Link to="/fan-shop" className="hover:text-accent transition-colors">Webshop</Link></li>
                        </ul>
                    </div>
                    <div className="transition-all duration-300 ease-in-out hover:translate-y-[-5px]">
                        <h3 className="text-xl font-semibold mb-4 text-accent">Kontakt</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <MailOutlined className="mr-2 text-accent" />
                                <a href="mailto:snkmoslavac@gmail.com" className="hover:text-accent transition-colors">snkmoslavac@gmail.com</a>
                            </li>
                            <li className="flex items-center">
                                <PhoneOutlined className="mr-2 text-accent" />
                                <a href="tel:+38512345678" className="hover:text-accent transition-colors">+385 1 234 5678</a>
                            </li>
                            <li className="flex items-center">
                                <EnvironmentOutlined className="mr-2 text-accent" />
                                <address>Trg Grofa Erdodyja b. b. 44317 Popovača</address>
                            </li>
                        </ul>
                    </div>
                    <div className="transition-all duration-300 ease-in-out hover:translate-y-[-5px]">
                        <h3 className="text-xl font-semibold mb-4 text-accent">Obavijesti</h3>
                        <p className="mb-4">Budite u toku s najnovijim vijestima i obavijestima</p>
                        <form className="space-y-2">
                            <Input
                                placeholder="Vaša email adresa"
                                className="bg-primary-foreground text-primary border-accent focus:border-accent hover:border-accent"
                            />
                            <Button type="primary" className="w-full mt-2 bg-accent hover:bg-accent-dark border-none transition-colors duration-300">Potvrdi</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-primary-foreground/20">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-center md:text-left text-sm">&copy; {new Date().getFullYear()} SNK Moslavac. Sva prava pridržana. Dizajn i razvoj web stranice: Adriano Faletar</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="https://www.facebook.com/SNKMoslavacPopovaca"
                                aria-label="Facebook"
                                className="text-primary-foreground hover:text-accent transition-colors duration-300"
                            >
                                <FacebookOutlined className="text-2xl hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="https://www.youtube.com/@SNKMoslavacPopovaca"
                                aria-label="YouTube"
                                className="text-primary-foreground hover:text-accent transition-colors duration-300"
                            >
                                <YoutubeOutlined className="text-2xl hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

