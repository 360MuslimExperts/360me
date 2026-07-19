"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TeamCard from '@/components/TeamCard';
import DepartmentFilter from '@/components/DepartmentFilter';

export default function TeamContent({ teamData, availableYears, year }) {
    const [activeDept, setActiveDept] = useState('all');

    if (!teamData) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Year not found</h2>
                    <Link href="/team" className="px-6 py-2 bg-golden text-black rounded-lg font-bold">
                        Go to Latest Team
                    </Link>
                </div>
            </div>
        );
    }

    const departments = Object.keys(teamData);

    // Flatten data while preserving the precise structural assignment properties
    const displayedMembers = activeDept === 'all'
        ? departments.flatMap(dept => 
            (teamData[dept] || []).map(member => ({ ...member, dept }))
          )
        : (teamData[activeDept] || []).map(member => ({ ...member, dept: activeDept }));

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Meet Our Team
                    </h1>
                    <p className="text-lg text-text-light mb-8 max-w-2xl mx-auto">
                        The dedicated individuals working behind the scenes to make 360 Muslim Experts a reality.
                    </p>

                    {/* Temporal Archives */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <span className="text-sm font-semibold text-text-light uppercase tracking-wider self-center">Archives:</span>
                        {availableYears.map((yr) => (
                            <Link
                                key={yr}
                                href={`/team/${yr}`}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${year === String(yr)
                                    ? 'bg-golden text-black shadow-md'
                                    : 'bg-white/50 text-text-light hover:bg-white border border-transparent hover:border-golden'
                                    }`}
                            >
                                {yr}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Macro Pillar Filter Menu */}
                <DepartmentFilter
                    departments={departments}
                    activeDept={activeDept}
                    onSelect={setActiveDept}
                />

                {/* Grid Output */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {displayedMembers.length > 0 ? (
                        displayedMembers.map((member) => (
                            <TeamCard 
                                key={member.id !== undefined ? `id-${member.id}-${member.category}` : `name-${member.name}-${member.category}`} 
                                member={member} 
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            No team members registered under this section.
                        </p>
                    )}
                </div>

            </div>
        </main>
    );
}
