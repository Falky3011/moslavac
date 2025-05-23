import React from "react";
import { List, Avatar, Button } from "antd";
import { useGetCometImage } from "../../hooks/useGetCometImage";

const PlayerListItem = ({ player, onAdd }) => {
  const { data: playerImage } = useGetCometImage(player.picture);

  return (
    <List.Item actions={[<Button onClick={() => onAdd(player)}>Add</Button>]}>
      <List.Item.Meta
        avatar={<Avatar src={playerImage || player.picture} />}
        title={player.name}
        description={`${player.shortName} - Age: ${player.age}, Nationality: ${player.nationality}, Klub: ${player?.club?.name}`}
      />
    </List.Item>
  );
};

export default PlayerListItem;
