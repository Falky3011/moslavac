"use client";

import React, { useRef, useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import { motion } from "framer-motion";
import UpcomingMatchItem from "./UpcomingMatchItem";
import { useGetUpcomingMatches } from "../hooks/useGetUpcomingMatches";

const UpcomingMatches = () => {
  const { data: matches, isLoading, error } = useGetUpcomingMatches();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  console.log(matches);
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [matches]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="small" tip="Učitavanje utakmica..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert
          message="Greška"
          description="Došlo je do pogreške prilikom dohvaćanja utakmica. Pokušajte ponovno kasnije."
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-full mx-auto px-2 sm:px-4 py-6 sm:py-12 bg-gray-100">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-8">
        Sljedeće utakmice
      </h2>

      <div className="relative">
        <motion.div
          ref={sliderRef}
          className="flex space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={checkScroll}
          whileTap={{ cursor: "grabbing" }}
        >
          {matches.map((match) => (
            <motion.div
              key={match.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] snap-start"
            >
              <UpcomingMatchItem match={match} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UpcomingMatches;
