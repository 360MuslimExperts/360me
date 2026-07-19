import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getTeamData(yearInt) {
  try {
    const context = getRequestContext();
    const db = context.env.DB;
    
    if (!db) throw new Error("Database binding missing");
    
    const query = `
      SELECT 
        v.id, v.name, v.reg_no as regNo, v.image, 
        ta.category, ta.role, v.github, v.instagram, 
        v.facebook, v.twitter, v.linkedin, v.youtube, v.website
      FROM team_assignments ta
      JOIN volunteers v ON ta.volunteer_id = v.id
      WHERE ta.year = ?
    `;
    
    const [teamRaw, founderRaw] = await Promise.all([
      db.prepare(query).bind(parseInt(yearInt)).all(),
      db.prepare("SELECT * FROM volunteers WHERE id = 0").first()
    ]);
    
    const results = teamRaw.results || [];
    
    // Explicit structural layout buckets matching your terminology exactly
    const groupedTeam = {
      "Governing Body": [],
      "National Team": [],
      "The 4 Forums": [],
      "Central Operational Departments": []
    };
    
    // Inject Founder into Governing Body at the absolute top by default
    if (founderRaw) {
      groupedTeam["Governing Body"].push({
        id: 0, name: founderRaw.name, role: "Founder", category: "Governing Body",
        regNo: null, image: founderRaw.image, github: founderRaw.github, 
        instagram: founderRaw.instagram, facebook: founderRaw.facebook, 
        twitter: founderRaw.twitter, linkedin: founderRaw.linkedin, 
        youtube: founderRaw.youtube, website: founderRaw.website
      });
    }
    
    results.forEach(row => {
      if (row.id === 0) return; // Avoid duplicating founder row
      
      const rawCat = row.category || "";
      let pillar = "Central Operational Departments"; // Default fallback
      let normalizedCategory = rawCat.trim();

      // 1. Route to Governing Body
      if (/govern/i.test(rawCat)) {
        pillar = "Governing Body";
        normalizedCategory = "Governing Body";
      } 
      // 2. Route to National Team
      else if (/national/i.test(rawCat)) {
        pillar = "National Team";
        normalizedCategory = "National Team";
      } 
      // 3. Route & Normalize The 4 Forums
      else if (/forum|medico|nurse|nursing|relig|research/i.test(rawCat)) {
        pillar = "The 4 Forums";
        if (/medico/i.test(rawCat)) normalizedCategory = "360 Medico Forum";
        else if (/nurse|nursing/i.test(rawCat)) normalizedCategory = "360 Nurse Forum";
        else if (/relig/i.test(rawCat)) normalizedCategory = "360 Religious Forum";
        else if (/research/i.test(rawCat)) normalizedCategory = "360 Research Forum";
      } 
      // 4. Route & Normalize Central Operational Departments
      else {
        pillar = "Central Operational Departments";
        if (/tech/i.test(rawCat)) normalizedCategory = "Technical Department";
        else if (/media/i.test(rawCat)) normalizedCategory = "Media Department";
        else if (/resource|hr/i.test(rawCat)) normalizedCategory = "Human Resources";
        else if (/finance|fund/i.test(rawCat)) normalizedCategory = "Financial Department";
        else if (/growth|pr/i.test(rawCat)) normalizedCategory = "Strategic Growth & PR";
      }

      groupedTeam[pillar].push({
        id: row.id,
        name: row.name,
        role: row.role,
        category: normalizedCategory, // Populates neat visual labels on team cards
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
    });
    
    // Prune empty pillars so your UI layout only displays active columns
    Object.keys(groupedTeam).forEach(key => {
      if (groupedTeam[key].length === 0) delete groupedTeam[key];
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
    const { results } = await db.prepare("SELECT DISTINCT year FROM team_assignments WHERE year > 0 ORDER BY year DESC").all();
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
