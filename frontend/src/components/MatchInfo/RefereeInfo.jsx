import React from 'react';

const RefereeInfo = ({ referees }) => {
    if (!referees?.length) return null;

    return (
        <div className="mt-4 bg-white rounded-3xl shadow-md p-6 border border-gray-200">
            <h3 className="text-xl text-gray-900 font-bold mb-4">Službene osobe</h3>
            <div className="divide-y divide-gray-200">
                {referees
                    .filter((official) => official.role !== 'Delegat')
                    .map((official, index) => (
                        <div key={index} className="py-2 flex items-center justify-between">
                            <span className="text-base font-medium text-gray-800">{official.name}</span>
                            <span className="text-sm text-gray-500 ">{official.role}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RefereeInfo;
