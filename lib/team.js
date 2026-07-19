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
    
    // Clean, readable display keys aligning with the structural chart
    const groupedTeam = {
      "Governing Body": [],
      "National Team": [],
      "360 Medico Forum": [],
      "360 Nurse Forum": [],
      "360 Religious Forum": [],
      "360 Research Forum": [],
      "Technical Department": [],
      "Media Department": [],
      "Human Resources": [],
      "Finance Department": [],
      "Strategic Growth & PR": [],
      "Local Cabinets": []
    };
    
    // 3. Inject the Founder into Governing Body at the top
    if (founderRaw) {
      groupedTeam["Governing Body"].push({
        id: 0,
        name: founderRaw.name,
        role: "Founder", 
        category: "Governing Body",
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
    
    // 4. Sort incoming entries with smooth normalization and automatic fallbacks
    results.forEach(row => {
      if (row.id === 0) return; // Skip duplication of founder row
      
      const rawCat = row.category || "";
      let targetBucket = null;

      // Smart Matching logic to tie varying DB strings to explicit UI buckets
      if (/govern/i.test(rawCat)) targetBucket = "Governing Body";
      else if (/national/i.test(rawCat)) targetBucket = "National Team";
      else if (/medico/i.test(rawCat)) targetBucket = "360 Medico Forum";
      else if (/nurse|nursing/i.test(rawCat)) targetBucket = "360 Nurse Forum";
      else if (/relig/i.test(rawCat)) targetBucket = "360 Religious Forum";
      else if (/research/i.test(rawCat)) targetBucket = "360 Research Forum";
      else if (/tech/i.test(rawCat)) targetBucket = "Technical Department";
      else if (/media/i.test(rawCat)) targetBucket = "Media Department";
      else if (/resource|hr/i.test(rawCat)) targetBucket = "Human Resources";
      else if (/finance/i.test(rawCat)) targetBucket = "Finance Department";
      else if (/growth|pr/i.test(rawCat)) targetBucket = "Strategic Growth & PR";
      else if (/cabinet|executive|ground/i.test(rawCat)) targetBucket = "Local Cabinets";
      else {
        // Dynamic Catch: Use the raw value if it doesn't match predefined structural rules
        targetBucket = rawCat.trim();
      }

      if (targetBucket) {
        // If it's an unlisted department, instantly build a container row on the fly
        if (!groupedTeam[targetBucket]) {
          groupedTeam[targetBucket] = [];
        }

        groupedTeam[targetBucket].push({
          id: row.id,
          name: row.name,
          role: row.role,
          category: targetBucket, // Keeps text rendering stable across UI badges
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
    
    // 5. Cleanup step: Prune empty buckets so your filter layout stays completely clean
    Object.keys(groupedTeam).forEach(key => {
      if (groupedTeam[key].length === 0) {
        delete groupedTeam[key];
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
