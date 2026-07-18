import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getTeamData(yearInt) {
  try {
    const context = getRequestContext();
    const db = context.env.DB;
    
    if (!db) throw new Error("Database binding missing");
    
    // 1. Core Year Query
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
      WHERE ta.year = ?
    `;
    
    // 2. Fetch both the year roster and the founder record in parallel
    const [teamRaw, founderRaw] = await Promise.all([
      db.prepare(query).bind(parseInt(yearInt)).all(),
      db.prepare("SELECT * FROM volunteers WHERE id = 0").first()
    ]);
    
    const results = teamRaw.results || [];
    
    // Initialize groupings (including any newer operational layout buckets)
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
    
    // 3. Inject the Founder into Governing at the absolute top by default
    if (founderRaw) {
      groupedTeam.governing.push({
        name: founderRaw.name,
        role: "Founder", // Forced permanent role
        regNo: null, // Founder has no registry payload
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
    
    // 4. Sort the remaining volunteers safely
    results.forEach(row => {
      // Don't duplicate the founder if he was accidentally added to assignments
      if (row.id === 0) return;
      
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
    const { results } = await db.prepare("SELECT DISTINCT year FROM team_assignments ORDER BY year DESC").all();
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