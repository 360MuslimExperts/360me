// /team/[year]/index.jsx
import Link from "next/link";
import styles from "./dept.module.css";

// Import JSONs statically
import team2024 from "@/data/team/2024.json";
import team2025 from "@/data/team/2025.json";

const teamData = {
  2024: team2024,
  2025: team2025,
};

export default function TeamYear({ year, departments }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Team {year}</h1>
      <p style={{ marginBottom: "1.5rem" }}>Click a department to view members:</p>

      <div className={styles.grid}>
        {departments.map((dept) => (
          <Link key={dept} href={`/team/${year}/${dept}`}>
            <div className={styles.card}>
              <h2 className={styles.name}>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { year } = params;
  const data = teamData[year];

  if (!data) {
    return { notFound: true };
  }

  const departments = Object.keys(data);

  return { props: { year, departments } };
}

export async function getStaticPaths() {
  const years = Object.keys(teamData);

  const paths = years.map((year) => ({ params: { year } }));

  return { paths, fallback: false };
}
