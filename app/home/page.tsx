"use client";

// Importez Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Hero from "../components/sections/Hero";
import Blog from "../components/sections/Blog";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contacts";
import Layout from "../components/sections/layout";

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
