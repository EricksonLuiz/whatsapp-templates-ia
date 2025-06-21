
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 rounded-xl p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
