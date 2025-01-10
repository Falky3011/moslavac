import React from "react";
import { Button } from "antd";
import { YoutubeOutlined, TeamOutlined } from "@ant-design/icons";

export default function FootballClubYouTubePromo() {
  const youtubeChannelUrl = "https://www.youtube.com/@SNKMoslavacPopovaca";

  const subscriberStat = {
    icon: <TeamOutlined />,
    label: "Pretplatnika",
    value: "150+",
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 my-12 relative overflow-hidden max-w-7xl mx-auto transition-all duration-300 hover:shadow-xl">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-8 lg:mb-0 lg:mr-8 flex-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight ">
            Gledajte Naše Utakmice Uživo!
          </h2>
          <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-700">
            Ne propustite nijednu utakmicu! Pretplatite se na naš YouTube kanal
            za prijenose uživo, najbolje trenutke i ekskluzivni sadržaj.
          </p>
          <Button
            type="primary"
            icon={<YoutubeOutlined />}
            size="large"
            className="text-white bg-blue-600 px-4 py-2 rounded-md font-medium text-sm sm:text-base transition duration-200 ease-in-out shadow-md hover:bg-blue-700 hover:shadow-lg"
            onClick={() => window.open(youtubeChannelUrl, "_blank")}
          >
            Posjetite Naš YouTube Kanal
          </Button>
        </div>
        <div className="w-full lg:w-auto">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-2xl">
            <div className="text-3xl text-blue-500 mb-2">
              {subscriberStat.icon}
            </div>
            <div className="text-sm text-gray-600 text-center">
              {subscriberStat.label}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {subscriberStat.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
