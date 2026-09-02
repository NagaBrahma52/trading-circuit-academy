import AnnouncementBar from "./components/landing/AnnouncementBar";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Benefits from "./components/landing/Benefits";
import Process from "./components/landing/Process";
import Pricing from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import FAQ from "./components/landing/FAQ";
import Contact from "./components/landing/Contact";
import LandingFooter from "./components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="bg-circuit-bg">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Benefits />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <LandingFooter />
    </div>
  );
}
