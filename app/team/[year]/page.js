import React from 'react';
import { getTeamData, getAvailableYears } from '@/lib/team';
import TeamContent from '@/components/TeamContent';

export const runtime = 'edge';

export default async function TeamYearPage({ params }) {
    // 1. In Next.js 15, params is a Promise, so we await it
    const { year } = await params;
    
    // 2. Await the new async database calls from lib/team.js
    const teamData = await getTeamData(year);
    const availableYears = await getAvailableYears();

    return (
        <TeamContent
            teamData={teamData || { governing: [], national: [], medico: [], media: [], technical: [] }}
            availableYears={availableYears}
            year={year}
        />
    );
}
