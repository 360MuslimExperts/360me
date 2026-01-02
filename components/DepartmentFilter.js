"use client";

import React from "react";
import { formatDepartmentName } from "@/lib/team";

const DepartmentFilter = ({ departments, activeDept, onSelect }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 my-8">
            <button
                onClick={() => onSelect('all')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeDept === 'all'
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white text-primary hover:bg-gray-50 border border-gray-200'
                    }`}
            >
                All Departments
            </button>

            {departments.map((dept) => (
                <button
                    key={dept}
                    onClick={() => onSelect(dept)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeDept === dept
                            ? 'bg-primary text-white shadow-lg scale-105'
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
