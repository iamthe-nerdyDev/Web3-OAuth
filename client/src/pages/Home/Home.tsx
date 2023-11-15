import {
  Bonus,
  FAQ,
  Features,
  Footer,
  Hero,
  Methodology,
  Navbar,
  Preview,
} from "@/components";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Home.css";

const Home = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <main className={`bg-${theme}`}>
      <Navbar />
      <Hero />
      <Preview />
      <Features />
      <Methodology />
      <Bonus />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Home;
