import React from 'react';
import { getTeamData, getAvailableYears } from '@/lib/team';
import TeamContent from '@/components/TeamContent';

export const runtime = 'edge';
// ⚡ Destroys the layout cache lag on state routing swaps completely
export const dynamic = 'force-dynamic';

export default async function TeamYearPage({ params }) {
    const { year } = await params;
    
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
