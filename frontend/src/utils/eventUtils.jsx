import { Link } from "react-router-dom";

export const formatEventTime = (minuteFull, stoppageTime) =>
  stoppageTime ? `${minuteFull}+${stoppageTime}` : `${minuteFull}'`;

export const renderPlayerName = (player, isMoslavacEvent, competition) => {
  if (!player) return null;
  return isMoslavacEvent ? (
    <Link
      to={`/stats/${player.personId}/${competition?.id}`}
      className="hover:underline"
    >
      {player.name}
    </Link>
  ) : (
    player.name
  );
};
