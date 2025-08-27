import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TeamIndex() {
  const router = useRouter();

  useEffect(() => {
    // You can hardcode latest year or fetch dynamically if needed
    router.replace("/team/2025"); // replace with the latest year
  }, [router]);

  return <p>Redirecting to the latest team...</p>;
}
