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
import Certificates from "../components/sections/Certificate";

export default function Home() {
  return (
    <div>
      <Layout>
        <Hero />
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/img/2.png')",
              height: "100%",
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <Skills />
          <Projects />
        </div>
        <Blog />
        <Certificates />
        <Contact />
      </Layout>
    </div>
  );
}
