import Footer from "../../components/Footer";
import About from "./components/About";
import GetInvolved from "./components/GetInvolved";
import Hero from "./components/Hero";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";

export default function Home() {
  return (
    <div className="Home">
      <Hero />
      <About />
      <GetInvolved />
      <Speakers />
      <Sponsors />
      <Footer />
    </div>
  );
}
