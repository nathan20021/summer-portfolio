import * as React from "react";

type AnalyticsCardProps = {
  stats: number;
  title: string;
};

const AnalyticCard = ({ stats, title }: AnalyticsCardProps) => {
  return (
    <div>
      <div className="hover:cursor-pointer bg-[#333] px-14 py-4 text-center rounded-xl">
        <h1 className="text-4xl font-bold py-3">{stats}</h1>
        <h1 className="text-base">{title}</h1>
      </div>
    </div>
  );
};

export default AnalyticCard;
