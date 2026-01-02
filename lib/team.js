export function getTeamData(year) {
    try {
        // In a real app with dynamic imports, we might need a map or try/catch generic require
        // Since we know the years 2024 and 2025 exist, we can try to import them.
        // However, in Next.js/Webpack, dynamic require is tricky on the client/edge.
        // We'll use a static map for now or try to fetch if it was an API.
        // Given the environment, let's use a dynamic import map or just a switch for now to be safe, 
        // or better, read the file using fs if it's server-side, but 'fs' might not be available in client components.
        // We will stick to requiring the specific JSON files we know exist.

        // Actually, looking at the project structure, `data/team` contains JSONs.
        // We can import them all and return based on year.

        const data2024 = require('@/data/team/2024.json');
        const data2025 = require('@/data/team/2025.json');

        const years = {
            '2024': data2024,
            '2025': data2025
        };

        return years[year] || null;
    } catch (e) {
        console.error("Error loading team data:", e);
        return null;
    }
}

export function getAvailableYears() {
    return ['2025', '2024'];
}

export function getDepartments(year) {
    const data = getTeamData(year);
    if (!data) return [];
    // transform keys to proper department names if needed
    // e.g. "medico" -> "Medico 360", "national" -> "National Team"
    // For now, return keys sorted
    return Object.keys(data);
}

export function formatDepartmentName(key) {
    const map = {
        'governing': 'Governing Body',
        'national': 'National Team',
        'medico': 'Medico 360',
        'media': 'Media Team',
        'technical': 'Technical Team',
        'education': '360 Education'
    };
    return map[key.toLowerCase()] || key.charAt(0).toUpperCase() + key.slice(1);
}
