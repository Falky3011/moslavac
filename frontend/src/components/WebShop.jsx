import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import jakna from '../assets/webshop/Jakna.jpg';
import hoody from '../assets/webshop/Hoody.jpg';
import polo from '../assets/webshop/Polo-majica.jpg';
import trenirka from '../assets/webshop/Calcio-trenirka-1.jpg';
import dresPlavi from '../assets/webshop/Screenshot_2.png';
import dresBijeli from '../assets/webshop/Screenshot_1.png';






const items = [
    {
        id: 1,
        image: dresBijeli,
        text: 'Domaći dres',
    },
    {
        id: 2,
        image: dresPlavi,
        text: 'Gostujući dres',
    },
    {
        id: 3,
        image: trenirka,
        text: 'Trenirka',
    },

    {
        id: 4,
        image: jakna,
        text: 'Jakna',
    },
    {
        id: 5,
        image: hoody,
        text: 'Duksa',
    },
    {
        id: 6,
        image: polo,
        text: 'Polo majica',
    },

];

export default function Component() {
    const carouselRef = React.useRef(null);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50 rounded-3xl shadow-xl my-36 transition-all duration-300 hover:shadow-2xl hover:border-gray-300">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">WebShop</h1>
            <div className="relative">
                <Carousel
                    ref={carouselRef}
                    slidesToShow={3}
                    dots={false}
                    arrows={false}
                    className="[-webkit-tap-highlight-color:transparent]"
                >
                    {items.map((item) => (
                        <div key={item.id} className="px-3 my-12 ">
                            <div className="bg-white w-[250px] h-[400px] mx-auto rounded-3xl shadow-lg overflow-hidden ">
                                <div className="relative w-full h-[300px] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.text}
                                        className="w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.text}</h3>
                                    <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                                        Kupi odmah
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none transition duration-300 ease-in-out"
                    onClick={() => carouselRef.current.prev()}
                >
                    <LeftOutlined className="text-gray-800 text-xl" />
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none transition duration-300 ease-in-out"
                    onClick={() => carouselRef.current.next()}
                >
                    <RightOutlined className="text-gray-800 text-xl" />
                </button>
            </div>
        </div>
    );
}
