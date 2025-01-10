import React from "react";
import { AnimatedNumber } from "./AnimatedNumber";
import { Typography } from "antd";

const { Text } = Typography;

export function StatCard({ icon, title, value, color }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-md`}>
      <div className="flex items-center mb-2">
        {icon}
        <Text className="ml-2 font-semibold">{title}</Text>
      </div>
      <div className={`text-3xl font-bold text-${color}-600`}>
        <AnimatedNumber value={value} />
      </div>
    </div>
  );
}
