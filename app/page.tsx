import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import ClientResults from "./components/landing/ClientResults";
import AvailablePlans from "./components/landing/AvailablePlans";
import Numbers from "./components/landing/Numbers";
import LandingFooter from "./components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="bg-circuit-bg">
      <Navbar />
      <Hero />
      <About />
      <ClientResults />
      <AvailablePlans />
      <Numbers />
      <LandingFooter />
    </div>
  );
}
