import React from 'react';
import { Input, Button } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';  // Correct import
import grb from '../assets/grb.png';

export default function Footer() {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <footer className="bg-gradient-to-b from-primary to-primary-dark text-primary-foreground mt-10 bg-gray-100">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="container mx-auto px-4 py-12"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-12 space-y-6">
                    <div className="relative group">
                        <motion.img
                            src={grb}
                            alt="Club Crest"
                            className="w-[150px] h-[150px] z-10 relative"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-md transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl font-bold text-primary-foreground mb-2"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 5 }}
                        >
                            Ovdje nitko nije normalan
                        </motion.h2>
                        <motion.div
                            className="h-1 w-20 bg-accent mx-auto rounded-full"
                            variants={{
                                hidden: { width: 0 },
                                visible: { width: 80 }
                            }}
                            transition={{ duration: 0.8 }}
                        ></motion.div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-4 text-accent">Klub</h3>
                        <ul className="space-y-2">
                            <li><Link to="/ulaznice" className="hover:text-accent transition-colors">Ulaznice</Link></li>
                            <li><Link to="/clanstvo" className="hover:text-accent transition-colors">Službene osobe</Link></li>
                            <li><Link to="/navijacka-zona" className="hover:text-accent transition-colors">Treneri</Link></li>
                            <li><Link to="/fan-shop" className="hover:text-accent transition-colors">Webshop</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div variants={itemVariants}>
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
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-4 text-accent">Obavijesti</h3>
                        <p className="mb-4">Budite u toku s najnovijim vijestima i obavijestima</p>
                        <form className="space-y-2">
                            <Input
                                placeholder="Vaša email adresa"
                                className="bg-primary-foreground text-primary border-accent focus:border-accent hover:border-accent"
                            />
                            <Button type="primary" className="w-full mt-2 bg-accent hover:bg-accent-dark border-none">Potvrdi</Button>
                        </form>
                    </motion.div>
                </div>
                <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-8 border-t border-primary-foreground/20"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-center md:text-left text-sm">&copy; {new Date().getFullYear()} SNK Moslavac. Sva prava pridržana. Dizajn i razvoj web stranice: Adriano Faletar</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <motion.a
                                href="https://facebook.com"
                                aria-label="Facebook"
                                className="text-primary-foreground hover:text-accent"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                                <FacebookOutlined className="text-2xl" />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                aria-label="Instagram"
                                className="text-primary-foreground hover:text-accent"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                                <InstagramOutlined className="text-2xl" />
                            </motion.a>
                            <motion.a
                                href="https://youtube.com"
                                aria-label="YouTube"
                                className="text-primary-foreground hover:text-accent"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                                <YoutubeOutlined className="text-2xl" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
