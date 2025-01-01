import React from 'react';

export const renderForm = (record) => {
    const formResults = ['m1', 'm2', 'm3', 'm4', 'm5'].map((key) => record[key]?.result || '-');
    return (
        <div className="flex justify-center space-x-1 md:space-x-2">
            {formResults.map((result, index) => (
                <span
                    key={index}
                    className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[10px] md:text-xs font-bold rounded-full ${result === 'W' ? 'bg-green-500 text-white' :
                        result === 'D' ? 'bg-yellow-500 text-white' :
                            result === 'L' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                >
                    {result}
                </span>
            ))}
        </div>
    );  
};

