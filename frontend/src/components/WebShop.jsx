import React from 'react';
import { Carousel } from 'antd';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import jakna from '../assets/webshop/Jakna.jpg';
import hoody from '../assets/webshop/Hoody.jpg';
import polo from '../assets/webshop/Polo-majica.jpg';
import trenirka from '../assets/webshop/Calcio-trenirka-1.jpg';
import dresPlavi from '../assets/webshop/Screenshot_2.png';
import dresBijeli from '../assets/webshop/Screenshot_1.png';

const items = [
    { id: 1, image: dresBijeli, text: 'Domaći dres' },
    { id: 2, image: dresPlavi, text: 'Gostujući dres' },
    { id: 3, image: trenirka, text: 'Trenirka' },
    { id: 4, image: jakna, text: 'Jakna' },
    { id: 5, image: hoody, text: 'Duksa' },
    { id: 6, image: polo, text: 'Polo Majica' },
];

export default function WebShop() {
    const carouselRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 py-12 sm:py-16 rounded-3xl bg-gradient-to-br from-gray-50 to-white shadow-xl transition-all duration-300 hover:shadow-2xl"
            style={{ y }}
        >
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
                WebShop
            </h1>
            <div className="relative">
                <Carousel
                    ref={carouselRef}
                    slidesToShow={3}
                    slidesToScroll={1}
                    dots={false}
                    arrows={false}
                    autoplay
                    autoplaySpeed={5000}
                    responsive={[
                        {
                            breakpoint: 640,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                    className="[-webkit-tap-highlight-color:transparent]"
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="px-2 sm:px-4 py-8"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white w-full max-w-[280px] h-[420px] mx-auto rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                                <div className="relative w-full h-[280px] overflow-hidden">
                                    <motion.img
                                        src={item.image}
                                        alt={item.text}
                                        className="w-full h-full object-cover transition duration-300 ease-in-out"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <motion.button
                                            className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Detalji
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.text}</h3>
                                    <motion.button
                                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Kupi odmah
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </Carousel>
                <motion.button
                    className="absolute top-1/2 -left-4 sm:left-0 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-md focus:outline-none transition duration-300 ease-in-out"
                    onClick={() => carouselRef.current?.prev()}
                    aria-label="Previous slide"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
                </motion.button>
                <motion.button
                    className="absolute top-1/2 -right-4 sm:right-0 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-md focus:outline-none transition duration-300 ease-in-out"
                    onClick={() => carouselRef.current?.next()}
                    aria-label="Next slide"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
                </motion.button>
            </div>
        </motion.div>
    );
}

