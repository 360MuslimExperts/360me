import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getTeamData(yearInt) {
  try {
    const context = getRequestContext();
    const db = context.env.DB;

    if (!db) throw new Error("Database binding missing");

    const query = `
      SELECT v.name, v.reg_no as regNo, v.image, ta.category, ta.role
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
        groupedTeam[row.category].push({
          name: row.name,
          role: row.role,
          regNo: row.regNo,
          image: row.image
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
    return ["2025", "2024"];
  }
}

export async function getDepartments(year) {
    const data = await getTeamData(year);
    if (!data) return [];
    return Object.keys(data);
}
