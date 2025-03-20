import type { IconType } from "react-icons";

import React from "react";

import { Skeleton } from "./ui/skeleton";

type CardProps = {
  title: string;
  content: string;
  footer?: string;
  icon?: IconType;
};

const DataCard: React.FC<CardProps> = ({
  title,
  content,
  footer,
  icon: Icon,
}) => {
  return (
    <div className="bg-white drop-shadow-xl rounded-lg p-6 flex flex-row justify-between items-center relative z-999">
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

export default DataCard;

export function DataCardLoading() {
  return (
    <div className="bg-white drop-shadow-xl rounded-lg p-6 flex flex-row justify-between items-center h-[172px]">
      <div>
        <Skeleton className="mb-2 w-32 h-8" />
        <Skeleton className="mt-2 w-48 h-8" />
        <Skeleton className="mt-2 w-24 h-6" />
      </div>
      <Skeleton className="size-10" />
    </div>
  );
}
