import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useGetCometImage } from "../../hooks/useGetCometImage";

const PlayerCard = ({ player, onRemove, competition }) => {
  const {
    data: playerImage,
    isLoading,
    error,
  } = useGetCometImage(player.picture);

  return (
    <div className="w-36 m-2 bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
      <Link to={`/stats/${player.personId}`} state={{ competition }}>
        <div className="relative h-36 bg-gray-200 flex items-center justify-center">
          {isLoading ? (
            <Spin size="small" />
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <UserOutlined className="text-4xl text-gray-400" />
            </div>
          ) : (
            <img
              src={playerImage}
              alt={player.shortName}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </Link>
      <div className="p-2 text-center">
        <Link
          to={`/stats/${player.personId}`}
          state={{ competition }}
          className="text-sm font-semibold text-gray-800 hover:underline"
        >
          {player.shortName}
        </Link>
        <div className="mt-2">
          <DeleteOutlined
            className="text-red-500 cursor-pointer hover:text-red-600 transition duration-150"
            onClick={() => onRemove(player.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
