import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Divider,
  List,
  message,
  Spin,
  Alert,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetPlayers,
  useAddPlayer,
  useDeletePlayer,
} from "../../hooks/usePlayer";
import { usePlayerSearch } from "../../hooks/usePlayerSearch";
import { useGetSeniorCompetition } from "../../hooks/useGetSeniorCompetition";
import PlayerCard from "./PlayerCard";
import { isAdmin } from "../../utils/adminUtils";
import PlayerListItem from "./PlayerListItem";

export default function FirstTeam() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: players = [],
    isLoading: loadingPlayers,
    error: playersError,
  } = useGetPlayers();
  const {
    data: searchResults = [],
    isLoading: loadingSearch,
    error: searchError,
  } = usePlayerSearch(searchKeyword);
  const {
    data: seniorCompetition,
    isLoading: loadingCompetition,
    error: competitionError,
  } = useGetSeniorCompetition();
  const { mutate: addPlayer } = useAddPlayer();
  const { mutate: deletePlayer } = useDeletePlayer();

  const handleAddPlayer = (player) => {
    addPlayer(
      {
        personId: player.personId,
        name: player.name,
        shortName: player.shortName,
        picture: player.picture,
        position: selectedPosition,
      },
      {
        onSuccess: () => {
          message.success("Player added successfully");
          setIsModalVisible(false);
          setSearchKeyword("");
        },
        onError: () => message.error("Failed to add player"),
      }
    );
  };

  const handleRemovePlayer = (playerId) => {
    deletePlayer(playerId, {
      onSuccess: () => message.success("Player removed successfully"),
      onError: () => message.error("Failed to remove player"),
    });
  };

  const renderPositionSection = (title, position) => (
    <div key={position} className="my-6">
      <div className="flex items-center justify-between mb-4">
        <Divider orientation="left" className="text-lg font-semibold">
          {title}
          {isAdmin() && (
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => {
                setSelectedPosition(position);
                setIsModalVisible(true);
              }}
              className="shadow hover:scale-110 transition-transform ml-3"
            />
          )}
        </Divider>
      </div>
      {loadingPlayers ? (
        <Spin size="small" tip="Loading players..." />
      ) : playersError ? (
        <Alert
          message="Error"
          description="Failed to load players. Please try again."
          type="error"
          showIcon
        />
      ) : (
        <div className="flex flex-wrap gap-4">
          {players
            .filter((p) => p.position === position)
            .map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onRemove={handleRemovePlayer}
                competition={seniorCompetition}
              />
            ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 md:w-[70%] mx-auto rounded-3xl shadow-md bg-gray-50 my-8">
      <h1 className="text-2xl font-bold text-center mb-8">Momčad</h1>
      {loadingCompetition ? (
        <Spin
          size="small"
          tip="Loading competition..."
          className="flex justify-center items-center"
        />
      ) : competitionError ? (
        <Alert
          message="Error"
          description="Failed to load competition. Please try again."
          type="error"
          showIcon
        />
      ) : (
        ["vratari", "braniči", "vezni", "napadači", "trener"].map((position) =>
          renderPositionSection(
            position.charAt(0).toUpperCase() + position.slice(1),
            position
          )
        )
      )}
      <Modal
        title="Add Player"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Input
          placeholder="Search for a player"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="mb-4"
        />
        {loadingSearch ? (
          <Spin
            size="small"
            tip="Searching players..."
            className="flex justify-center"
          />
        ) : searchError ? (
          <Alert
            message="Error"
            description="Failed to search players. Please try again."
            type="error"
            showIcon
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={searchResults?.result || []}
            renderItem={(player) => (
              <PlayerListItem player={player} onAdd={handleAddPlayer} />
            )}
          />
        )}
      </Modal>
    </div>
  );
}
