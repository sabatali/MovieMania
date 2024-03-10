import React, { useState } from 'react';

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState();

    return (
        <div>
            <div className="flex">
                {data.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => onTabChange(tab, index)}
                        className={`bg-white text-gray-800 px-4 py-2 rounded-lg mr-4 focus:outline-none `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SwitchTabs;
