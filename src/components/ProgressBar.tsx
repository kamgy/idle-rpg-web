import React from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
  progress: number; // A value between 0 and 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${Math.min(progress, 1) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
