import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getTeamData(yearInt) {
  try {
    const context = getRequestContext();
    const db = context.env.DB;

    if (!db) throw new Error("Database binding missing");

    const requestedYear = parseInt(yearInt);

    // ⚡ Query updated to check if requested year falls inside the member's range
    const query = `
      SELECT 
        v.id,
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
      WHERE ? >= ta.start_year 
        AND (? <= ta.end_year OR ta.end_year IS NULL)
    `;

    // Fetch both the year roster and the founder record in parallel
    const [teamRaw, founderRaw] = await Promise.all([
      db.prepare(query).bind(requestedYear, requestedYear).all(),
      db.prepare("SELECT * FROM volunteers WHERE id = 0").first()
    ]);

    const results = teamRaw.results || [];

    const groupedTeam = {
      governing: [],
      national: [],
      medico: [],
      nursing: [],
      media: [],
      technical: [],
      religious: [],
      events: []
    };

    // Inject the Founder into Governing at the top by default
    if (founderRaw) {
      groupedTeam.governing.push({
        name: founderRaw.name,
        role: "Founder", 
        regNo: null,     
        image: founderRaw.image,
        github: founderRaw.github,
        instagram: founderRaw.instagram,
        facebook: founderRaw.facebook,
        twitter: founderRaw.twitter,
        linkedin: founderRaw.linkedin,
        youtube: founderRaw.youtube,
        website: founderRaw.website
      });
    }

    results.forEach(row => {
      if (row.id === 0) return; // Prevent duplicating founder if manually added

      const cat = row.category?.toLowerCase();
      if (groupedTeam[cat]) {
        groupedTeam[cat].push({
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

    // Pulls all unique years across start and end thresholds safely
    const { results } = await db.prepare(`
      SELECT DISTINCT year FROM (
        SELECT start_year AS year FROM team_assignments
        UNION
        SELECT end_year AS year FROM team_assignments WHERE end_year IS NOT NULL
      ) ORDER BY year DESC
    `).all();

    return results.map(row => row.year.toString());
  } catch {
    return ["2026", "2025"];
  }
}

export async function getDepartments(year) {
    const data = await getTeamData(year);
    if (!data) return [];
    return Object.keys(data);
}
