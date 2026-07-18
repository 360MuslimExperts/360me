"use client";

import React from "react";

function formatDepartmentName(key) {
    const map = {
        'governing': 'Governing Body',
        'national': 'National Team',
        'medico': 'Medico 360',
        'media': 'Media Team',
        'technical': 'Technical Team',
        'education': '360 Education',
        'nursing': 'Nursing Care',
        'religious': 'Religious Affairs',
        'events': 'Events & Management'
    };
    return map[key.toLowerCase()] || key.charAt(0).toUpperCase() + key.slice(1);
}

const DepartmentFilter = ({ departments, activeDept, onSelect }) => {
    return (
        /* Reduced vertical margins from my-8 to my-5 */
        <div className="flex flex-wrap justify-center gap-2 my-5">
            <button
                onClick={() => onSelect('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 ${activeDept === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary hover:bg-gray-50 border border-gray-200'
                    }`}
            >
                All Departments
            </button>

            {departments.map((dept) => (
                <button
                    key={dept}
                    onClick={() => onSelect(dept)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 ${activeDept === dept
                            ? 'bg-primary text-white'
                            : 'bg-white text-primary hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    {formatDepartmentName(dept)}
                </button>
            ))}
        </div>
    );
};

export default DepartmentFilter;
