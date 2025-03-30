import React from "react";

interface NavigationButtonProps {
  label: string;
  badgeCount?: number;
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  label,
  badgeCount,
  onClick,
}) => (
  <button className="navigation-button" onClick={onClick}>
    {label}
    {badgeCount && <span className="badge">{badgeCount}</span>}
  </button>
);

export default NavigationButton;
