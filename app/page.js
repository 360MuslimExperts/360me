import React from "react";
import { getTeamData } from "@/lib/team";
import HomeClient from "./page.client";

export const runtime = "edge";

export default async function Home() {
    // 1. Fetch the 2026 dataset right on the edge
    const teamData = await getTeamData("2026") || {};
    
    // 2. Filter out just the department leads
    const departmentHeads = Object.values(teamData)
        .flat()
        .filter(member => member.role?.toLowerCase() === "head");

    // 3. Mount the client wrapper and pass the data down
    return <HomeClient featuredHeads={departmentHeads} />;
}
