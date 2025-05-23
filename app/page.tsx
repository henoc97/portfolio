"use client";

import Hero from "./components/sections/Hero";
import Blog from "./components/sections/Blogs";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contacts";
import Layout from "./components/sections/layout";
import Certificates from "./components/sections/Certificates";
import blurData from "@/public/img/blur-data.json";
import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import portfolioService from "./application/services/portfolio.service";
import { PortfolioInfo } from "./application/models/portfolio";

export default function Home() {
  const [portfolioInfo, setPortfolioInfo] = useState<PortfolioInfo | null>(
    null
  );

  useEffect(() => {
    const fetchPortfolioInfo = async () => {
      try {
        const data = await portfolioService.getPortfolioInfo();
        setPortfolioInfo(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations du portfolio:",
          error
        );
      }
    };

    fetchPortfolioInfo();
  }, []);

  return (
    <div>
      <Layout>
        <Hero />
        <div className="relative min-h-screen">
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src="/img/2.png"
              alt="Background"
              fill
              placeholder="blur"
              priority
              blurDataURL={blurData["2.png"]}
              className="object-cover"
              sizes="100vw"
            />
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
              {portfolioInfo?.socialLinks.linkedin && (
                <a
                  href={portfolioInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FaLinkedin size={30} />
                </a>
              )}
              {portfolioInfo?.socialLinks.github && (
                <a
                  href={portfolioInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <FaGithub size={30} />
                </a>
              )}
              {portfolioInfo?.socialLinks.whatsapp && (
                <a
                  href={`https://wa.me/+${portfolioInfo.socialLinks.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 transition-colors"
                >
                  <FaWhatsapp size={30} />
                </a>
              )}
              {portfolioInfo?.socialLinks.twitter && (
                <a
                  href={portfolioInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <FaTwitter size={30} />
                </a>
              )}
              {portfolioInfo?.socialLinks.instagram && (
                <a
                  href={portfolioInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors"
                >
                  <FaInstagram size={30} />
                </a>
              )}
              {portfolioInfo?.socialLinks.facebook && (
                <a
                  href={portfolioInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <FaFacebook size={30} />
                </a>
              )}
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
