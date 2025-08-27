export const runtime = 'nodejs';

import fs from "fs";
import path from "path";
import Link from "next/link";
import styles from "./dept.module.css"; // reuse your member CSS

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
  const jsonPath = path.join(process.cwd(), "data", "team", `${year}.json`);
  const allData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const departments = Object.keys(allData);

  return { props: { year, departments } };
}

export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), "data", "team");
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));
  const years = files.map(f => f.replace(".json", ""));

  const paths = years.map((year) => ({ params: { year } }));

  return { paths, fallback: false };
}
