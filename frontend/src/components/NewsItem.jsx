import React from "react";
import moment from "moment";
import grb from "../../public/grb.png";

const NewsItem = ({ news }) => {
  return (
    <div className="space-y-4">
      <img
        src={news.thumbnailPath ? news.thumbnailPath : grb}
        alt="Thumbnail"
        className="w-full h-48 object-cover rounded-lg shadow-md"
      />

      <div>
        <p className="font-bold text-lg">{news.title}</p>
        <p className="text-sm text-gray-500">
          {moment(news.date).format("YYYY-MM-DD HH:mm")}
        </p>
      </div>
      <div className="max-h-60 overflow-y-auto prose">{news.content}</div>
    </div>
  );
};

export default NewsItem;
