import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
}

export const ButtonWidget: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-primary text-white font-medium rounded-theme shadow-theme hover:brightness-110 transition-all text-sm"
    >
      {label}
    </button>
  );
};