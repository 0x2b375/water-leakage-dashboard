import React from "react";
import { IconType } from "react-icons";

interface CardProps {
  title: string;
  content: string;
  footer?: string;
  icon?: IconType;
}

const Card: React.FC<CardProps> = ({ title, content, footer, icon: Icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-row justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{content}</p>
        {footer && <div className="mt-4 text-sm text-gray-500">{footer}</div>}
      </div>
      {Icon && (
        <div className="flex justify-center items-center border border-blue-600 bg-blue-500 rounded-lg p-2 w-10 h-10">
          <Icon className="text-3xl text-white" />
        </div>
      )}
    </div>
  );
};

export default Card;
