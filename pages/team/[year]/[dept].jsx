// /team/[year]/[dept].jsx
import Link from "next/link";
import styles from "./dept.module.css";

// Import JSONs statically
import team2024 from "@/data/team/2024.json";
import team2025 from "@/data/team/2025.json";

const teamData = {
  2024: team2024,
  2025: team2025,
};

export default function TeamDept({ members, deptName, year, departments }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{deptName} - Team {year}</h1>

      {/* Department navigation */}
      <nav className={styles.nav}>
        {departments.map((d) => (
          <Link key={d} href={`/team/${year}/${d}`}>
            <span className={d === deptName.toLowerCase() ? styles.active : ""}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </span>
          </Link>
        ))}
      </nav>

      {/* Members */}
      {members.length === 0 ? (
        <p className={styles.noMembers}>No members found for this department.</p>
      ) : (
        <div className={styles.grid}>
          {members.map((m, idx) => (
            <div key={idx} className={styles.card}>
              <img src={m.image} alt={m.name} className={styles.avatar} />
              <h2 className={styles.name}>{m.name}</h2>
              <p className={styles.role}>{m.role}</p>
              {m.regNo && <p className={styles.regNo}>Reg No: {m.regNo}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { year, dept } = params;
  const data = teamData[year];

  if (!data || !data[dept]) {
    return { notFound: true };
  }

  const members = data[dept];
  const deptName = dept.charAt(0).toUpperCase() + dept.slice(1);
  const departments = Object.keys(data);

  return { props: { members, deptName, year, departments } };
}

export async function getStaticPaths() {
  const paths = [];

  Object.entries(teamData).forEach(([year, data]) => {
    Object.keys(data).forEach((dept) => {
      paths.push({ params: { year, dept } });
    });
  });

  return { paths, fallback: false };
}
