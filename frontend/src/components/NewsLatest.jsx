"use client";

import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Typography, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import grb from "../assets/grb.png";

const { Title, Text } = Typography;

const NewsLatest = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["latestNews"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/news/latest");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      return response.json();
    },
  });

  const scrollRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="small" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          message="Greška"
          description="Došlo je do problema pri učitavanju vijesti. Pokušajte ponovno kasnije."
          type="error"
          showIcon
          className="shadow-md rounded-lg"
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          message="Nema dostupnih vijesti"
          description="Trenutno nema vijesti za prikaz. Posjetite nas kasnije."
          type="info"
          showIcon
          className="shadow-md rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Title
        level={2}
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
      >
        Vijesti
      </Title>
      <div className="relative">
        <motion.div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {data.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              className="w-72 sm:w-80 md:w-full flex-shrink-0 snap-center md:snap-align-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-3xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl h-full">
                <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-3xl group">
                  <img
                    src={item.thumbnailPath ? item.thumbnailPath : grb}
                    alt={item.title}
                    className={`w-full h-full transform group-hover:scale-105 transition-transform duration-300 ${
                      item.thumbnailPath ? "object-cover" : "object-contain"
                    }`}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 line-clamp-2 text-gray-900 overflow-hidden h-[2.8em]">
                    {item.title}
                  </h3>
                  <Link to={`/news/${item.id}`} className="inline-block">
                    <span className="text-white bg-blue-600 px-3 sm:px-4 py-2 rounded-md font-medium text-xs sm:text-sm md:text-base hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg hover:shadow-2xl">
                      PROČITAJ
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent md:hidden" />
      </div>
    </div>
  );
};

export default NewsLatest;
