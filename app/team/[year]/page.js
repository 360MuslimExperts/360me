"use client";

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TeamCard from '@/components/TeamCard';
import DepartmentFilter from '@/components/DepartmentFilter';
import { getTeamData, getAvailableYears, getDepartments, formatDepartmentName } from '@/lib/team';

export default function TeamYearPage() {
    const params = useParams();
    const router = useRouter();
    // Unwrap params carefully (in Next.js 15 params might be async, but useEffect handles client side)
    // safe fallback
    const year = params?.year || '2025';

    const [activeDept, setActiveDept] = useState('all');
    const [teamData, setTeamData] = useState(null);
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        // In a real scenario we might fetch this from an API
        const data = getTeamData(year);
        setTeamData(data);
        setAvailableYears(getAvailableYears());
    }, [year]);

    if (!teamData) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Year not found</h2>
                    <Link href="/team" className="btn">Go to Latest Team</Link>
                </div>
            </div>
        );
    }

    const departments = Object.keys(teamData);

    // Filter logic
    const displayedMembers = activeDept === 'all'
        ? departments.flatMap(dept => teamData[dept].map(member => ({ ...member, dept })))
        : teamData[activeDept]?.map(member => ({ ...member, dept: activeDept })) || [];

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Meet Our Team
                    </h1>
                    <p className="text-lg text-text-light mb-8 max-w-2xl mx-auto">
                        The dedicated individuals working behind the scenes to make 360 Muslim Experts a reality.
                    </p>

                    {/* Year Selector */}
                    <div className="flex justify-center gap-4 mb-8">
                        <span className="text-sm font-semibold text-text-light uppercase tracking-wider self-center">Archives:</span>
                        {availableYears.map((yr) => (
                            <Link
                                key={yr}
                                href={`/team/${yr}`}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${year === yr
                                    ? 'bg-golden text-black shadow-md'
                                    : 'bg-white/50 text-text-light hover:bg-white border border-transparent hover:border-golden'
                                    }`}
                            >
                                {yr}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Filter */}
                <DepartmentFilter
                    departments={departments}
                    activeDept={activeDept}
                    onSelect={setActiveDept}
                />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {displayedMembers.length > 0 ? (
                        displayedMembers.map((member, idx) => (
                            <TeamCard key={`${member.name}-${idx}`} member={member} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-10">No members found in this department.</p>
                    )}
                </div>

                {/* Section Dividers if 'All' is selected (Optional enhancement) */}
                {/* If 'all' is selected, simply showing a mixed grid is fine, but sometimes users prefer grouped. 
            For now, a mixed grid is requested as per 'responsive' and simple. 
            We can stick to the flat list or group them? 
            Let's stick to flat for 'All' to be cleaner, or maybe grouped is better?
            Given the user said "display our current team... select a particular dept team", 
            a flat grid is standard for 'All', but maybe keeping structure is nicer.
            Let's keep it flat for simplicity and modern look, as 'all' implies a full roster.
        */}

            </div>
        </main>
    );
}
