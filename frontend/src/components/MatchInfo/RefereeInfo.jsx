import React from "react";

const RefereeInfo = ({ referees }) => {
  if (!referees?.length) return null;

  const filtered = referees.filter((official) => official.role !== "Delegat");

  return (
    <div className="mt-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center tracking-tight">
        Službene osobe
      </h3>
      <div className="divide-y divide-gray-200">
        {filtered.map((official, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <span className="text-base font-medium text-gray-700">
              {official.name}
            </span>
            <span className="text-sm text-gray-500 italic">
              {official.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefereeInfo;
