import React from "react";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#0B0B0C] flex flex-col relative z-10 overflow-hidden">
      <Hero />
      <About />
      <AboutUs />
      <Clients />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
