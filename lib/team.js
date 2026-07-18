import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getTeamData(yearInt) {
  try {
    const context = getRequestContext();
    const db = context.env.DB;

    if (!db) throw new Error("Database binding missing");

    // ⚡ Updated to select all the new social media asset columns
    const query = `
      SELECT 
        v.name, 
        v.reg_no as regNo, 
        v.image, 
        ta.category, 
        ta.role,
        v.github,
        v.instagram,
        v.facebook,
        v.twitter,
        v.linkedin,
        v.youtube,
        v.website
      FROM team_assignments ta
      JOIN volunteers v ON ta.volunteer_id = v.id
      WHERE ta.year = ?
    `;

    const { results } = await db.prepare(query).bind(parseInt(yearInt)).all();

    const groupedTeam = {
      governing: [],
      national: [],
      medico: [],
      media: [],
      technical: []
    };

    results.forEach(row => {
      if (groupedTeam[row.category]) {
        // ⚡ Added the social fields here so they aren't dropped before hitting the frontend
        groupedTeam[row.category].push({
          name: row.name,
          role: row.role,
          regNo: row.regNo,
          image: row.image,
          github: row.github,
          instagram: row.instagram,
          facebook: row.facebook,
          twitter: row.twitter,
          linkedin: row.linkedin,
          youtube: row.youtube,
          website: row.website
        });
      }
    });

    return groupedTeam;
  } catch (error) {
    console.error("D1 Fetch Error:", error);
    return null;
  }
}

export async function getAvailableYears() {
  try {
    const context = getRequestContext();
    const db = context.env.DB;

    const { results } = await db
      .prepare("SELECT DISTINCT year FROM team_assignments ORDER BY year DESC")
      .all();

    return results.map(row => row.year.toString());
  } catch {
    return ["2026", "2025", "2024"]; // Fallback handles the current cycle now
  }
}

export async function getDepartments(year) {
    const data = await getTeamData(year);
    if (!data) return [];
    return Object.keys(data);
}
