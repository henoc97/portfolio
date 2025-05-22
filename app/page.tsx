"use client";

import Hero from "./components/sections/Hero";
import Blog from "./components/sections/Blogs";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contacts";
import Layout from "./components/sections/layout";
import Certificates from "./components/sections/Certificates";
import { FaLinkedin, FaGithub, FaWhatsapp, FaTwitter } from "react-icons/fa";

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
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/henoc-amavigan/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="https://github.com/henock97"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://wa.me/+22897045559"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                <FaWhatsapp size={30} />
              </a>
              <a
                href="https://twitter.com/votre-compte"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={30} />
              </a>
            </div>
            <div className="text-center mt-4">
              <p>&copy; {new Date().getFullYear()} - Tous droits réservés</p>
            </div>
          </div>
        </footer>
      </Layout>
    </div>
  );
}
