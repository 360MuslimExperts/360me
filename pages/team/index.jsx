export const runtime = 'nodejs';


import { useEffect } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

export async function getServerSideProps() {
  const dataDir = path.join(process.cwd(), "data", "team");
  const files = fs.readdirSync(dataDir)
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""));

  const latestYear = files.sort().reverse()[0];

  return {
    redirect: {
      destination: `/team/${latestYear}`,
      permanent: false,
    }
  };
}

export default function TeamIndex() {
  return null; // will redirect automatically
}
