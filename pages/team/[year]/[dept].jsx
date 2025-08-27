import { useRouter } from "next/router";
import Link from "next/link";
import fs from "fs";
import path from "path";
import styles from "./dept.module.css";

export default function TeamDept({ members, deptName, year, departments }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {deptName} - Team {year}
      </h1>

      {/* Department navigation */}
      <nav className={styles.nav}>
        {departments.map((d) => (
          <Link key={d} href={`/team/${year}/${d}`} legacyBehavior>
            <a className={d === router.query.dept ? styles.active : ""}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </a>
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

// Get data for a specific department and year
export async function getStaticProps({ params }) {
  const { year, dept } = params;
  const jsonPath = path.join(process.cwd(), "data", "team", `${year}.json`);
  const allData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const members = allData[dept] || [];
  const deptName = dept.charAt(0).toUpperCase() + dept.slice(1);
  const departments = Object.keys(allData); // dynamically get all departments

  return { props: { members, deptName, year, departments } };
}

// Generate all paths dynamically based on JSON files
export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), "data", "team");
  const files = fs.readdirSync(dataDir);

  const years = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));

  let paths = [];

  years.forEach((year) => {
    const filePath = path.join(dataDir, `${year}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const depts = Object.keys(data);
    depts.forEach((dept) => paths.push({ params: { year, dept } }));
  });

  return { paths, fallback: false };
}
