import "../styles/Home.css";
import "../styles/reveal.css";
import useGlobalReveal from "../hooks/useGlobalReveal";

import Hero from "../components/home/Hero";
import Events from "../components/home/Events";
import Quote from "../components/home/Quote";
import Community from "../components/home/Community";
import Values from "../components/home/Values";

/*
  Home Page
  ---------
  This file ONLY:
  - Composes sections together
  - No UI details
  - No logic
*/

function Home() {
  // initialize the global reveal observer for this page
  useGlobalReveal("main");

  return (
    <main>
      <Hero />
      <Quote />
      <Events />
      <Community />
      <Values />
    </main>
  );
}

export default Home;
