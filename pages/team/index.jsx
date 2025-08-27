// /team/index.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TeamIndex() {
  const router = useRouter();

  useEffect(() => {
    // Hardcode the latest year or update manually
    router.replace("/team/2025");
  }, [router]);

  return <p>Redirecting to the latest team...</p>;
}
