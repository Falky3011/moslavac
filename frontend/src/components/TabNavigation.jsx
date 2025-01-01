import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => (
    <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg" role="group">
            {tabs.map((tab, index) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`px-4 py-2 text-sm font-medium border 
                        ${index === 0 ? 'rounded-l-lg' : ''} 
                        ${index === tabs.length - 1 ? 'rounded-r-lg' : ''} 
                        ${activeTab === tab.key
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                        }`}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    </div>
);

export default TabNavigation;
