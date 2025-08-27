import Hero from "@/components/Hero/Hero";
import Donate from "@/components/Donate/Donate";
import Experts from "@/components/Experts/Experts";
import Events from "@/components/Events/Events";
import Posts from "@/components/Posts/Posts";

export default function Home() {
  return (
    <>
      <Hero />
      <Events />
      <Donate />
      <Experts />
      <Posts />
    </>
  );
}
