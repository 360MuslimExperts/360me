import React from 'react';
import { getTeamData, getAvailableYears } from '@/lib/team';
import TeamContent from '@/components/TeamContent';

export const runtime = 'edge';

export default async function TeamYearPage({ params }) {
    // In Next.js 15, params is a Promise
    const { year } = await params;
    const teamData = getTeamData(year);
    const availableYears = getAvailableYears();

    return (
        <TeamContent
            teamData={teamData}
            availableYears={availableYears}
            year={year}
        />
    );
}
