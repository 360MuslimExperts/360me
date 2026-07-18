import React from 'react';
import { getTeamData, getAvailableYears } from '@/lib/team';
import TeamContent from '@/components/TeamContent';

export const runtime = 'edge';

export default async function TeamYearPage({ params }) {
    // 1. Await the params Promise for Next.js 15 compatibility
    const { year } = await params;
    
    // 2. Fetch both datasets simultaneously in parallel
    const [teamData, availableYears] = await Promise.all([
        getTeamData(year),
        getAvailableYears()
    ]);

    return (
        <TeamContent
            teamData={teamData || { governing: [], national: [], medico: [], media: [], technical: [] }}
            availableYears={availableYears || []}
            year={year}
        />
    );
}
