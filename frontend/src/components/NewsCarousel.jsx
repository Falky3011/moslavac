import React, { useRef } from "react";
import { Carousel, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import grb from "../../public/grb.png";
import { useGetLatestNews } from "../hooks/useGetLatestNews";

export default function NewsCarousel() {
  const carouselRef = useRef(null);
  const { data: newsData, error, isLoading } = useGetLatestNews();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="small" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <Alert
          message="Greška"
          description={
            error instanceof Error
              ? error.message
              : "Greška pri učitavanju vijesti. Pokušajte ponovno kasnije."
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <Alert
          message="Nema dostupnih vijesti"
          description="Trenutno nema dostupnih vijesti. Posjetite kasnije."
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white md:rounded-3xl shadow-md overflow-hidden">
      <Carousel
        ref={carouselRef}
        autoplay
        dotPosition="bottom"
        className="overflow-hidden"
      >
        {newsData.map((news) => (
          <div
            key={news.id}
            className="h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem]"
          >
            <div className="relative h-full group">
              <img
                src={news.thumbnailPath ? news.thumbnailPath : grb}
                alt={news.title}
                className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105 ${
                  news.thumbnailPath ? "object-cover" : "object-contain"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-end h-full">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 line-clamp-3 leading-tight">
                  {news.title}
                </h2>
                <Link
                  to={`/news/${news.id}`}
                  className="self-start mt-4 group inline-flex items-center"
                >
                  <span className="text-white bg-blue-600 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition duration-300 ease-in-out group-hover:bg-blue-700 shadow-md">
                    PROČITAJ
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
