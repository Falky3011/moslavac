"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Spin, Alert, Image, Divider } from "antd";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import grb from "../../public/grb.png";
import { useGetNewsDetail } from "../hooks/useGetNewsDetail";

const { Title, Paragraph } = Typography;

function NewsDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetNewsDetail(id);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return {
      date: formattedDate.toLocaleDateString(),
      time: format(formattedDate, "h:mm a"),
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="small" tip="Učitavanje..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          message="Greška"
          description={`Greška pri učitavanju detalja vijesti: ${error.message}`}
          type="error"
          showIcon
          className="shadow-md rounded-lg"
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          message="Nije pronađeno"
          description="Tražena vijest nije pronađena."
          type="warning"
          showIcon
          className="shadow-md rounded-lg"
        />
      </div>
    );
  }

  const { date, time } = formatDate(data.date);

  return (
    <div className="max-w-4xl mx-auto p-4 my-10">
      <article className="bg-white shadow-md rounded-3xl overflow-hidden">
        {/* Thumbnail */}
        <div className="w-full flex justify-center bg-gray-100">
          <Image
            src={data.thumbnailPath || grb}
            alt="Naslovna slika vijesti"
            className="object-contain "
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <Title
            level={2}
            className="text-xl md:text-xl font-bold text-gray-800 mb-4"
          >
            {data.title}
          </Title>
          <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap">
            <div className="flex items-center mr-4">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2" />
              <span>{time}</span>
            </div>
          </div>
          <Divider className="my-6" />
          <Paragraph className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.content}
          </Paragraph>

          {/* Additional Images */}
          {data.imagePaths && data.imagePaths.length > 0 && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.imagePaths.map((path, index) => (
                  <Image
                    key={index}
                    src={path}
                    alt={`Dodatna slika ${index + 1}`}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default NewsDetail;
