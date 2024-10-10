"use client";

import { Contact } from "lucide-react";
import Layout from "./components/sections/layout";
import Blog from "./components/sections/Blog";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";

export default function Home() {
  return (
    <div>
        <Layout>
          <Hero />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </Layout>
    </div>
  );
}
