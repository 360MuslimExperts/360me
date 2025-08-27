// import "@/styles/globals.css";
import "../styles/index.css"; 
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import "../components/Navbar/Navbar.css";


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div>
      <Navbar />
      <main className={isHome ? "no-padding" : "with-padding"}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
