export const runtime = 'nodejs';

import Link from "next/link";
import fs from "fs";
import path from "path";
import styles from "./dept.module.css";

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
              <p className={styles.regNo}>Reg No: {m.regNo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { year, dept } = params;
  const jsonPath = path.join(process.cwd(), "data", "team", `${year}.json`);
  const allData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const members = allData[dept] || [];
  const deptName = dept.charAt(0).toUpperCase() + dept.slice(1);
  const departments = Object.keys(allData);

  return { props: { members, deptName, year, departments } };
}

export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), "data", "team");
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));

  const paths = [];
  files.forEach((file) => {
    const year = file.replace(".json", "");
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
    Object.keys(data).forEach(dept => {
      paths.push({ params: { year, dept } });
    });
  });

  return { paths, fallback: false };
}
