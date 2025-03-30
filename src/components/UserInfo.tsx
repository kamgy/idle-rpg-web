import React from "react";
import ProgressBar from "./ProgressBar";

interface UserInfoProps {
  user: {
    level: number;
    experience: number;
    thisLevelExperience: number;
    nextLevelExperience: number;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const progress =
    (user.experience - user.thisLevelExperience) /
    (user.nextLevelExperience - user.thisLevelExperience);

  return (
    <div className="user-info">
      <p>Level: {user.level}</p>
      <ProgressBar progress={progress} />
      <p>
        {user.experience} / {user.nextLevelExperience} XP
      </p>
    </div>
  );
};

export default UserInfo;
