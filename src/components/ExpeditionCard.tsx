import React from "react";

interface ExpeditionCardProps {
  expedition: {
    id: string;
    status: string;
    finishAt: string;
  };
  onClick: () => void;
}

const ExpeditionCard: React.FC<ExpeditionCardProps> = ({
  expedition,
  onClick,
}) => {
  const getRemainingTime = (finishAt: string) => {
    const finishTime = new Date(finishAt).getTime();
    const now = new Date().getTime();
    const diff = finishTime - now;

    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diff / 1000) % 60)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="expedition-card" onClick={onClick}>
      <p>Status: {expedition.status}</p>
      {expedition.status === "Active" && (
        <p>Time Left: {getRemainingTime(expedition.finishAt)}</p>
      )}
    </div>
  );
};

export default ExpeditionCard;
