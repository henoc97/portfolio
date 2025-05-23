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
import { useAuth } from "./application/hooks/useAuth";
import { useEffect, useState } from "react";
import userService from "./application/services/user.service";

export default function Home() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUser(user?.id || "");
        setUserData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user]);

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
              {userData?.linkedin && (
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FaLinkedin size={30} />
                </a>
              )}
              {userData?.github && (
                <a
                  href={userData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <FaGithub size={30} />
                </a>
              )}
              {userData?.whatsapp && (
                <a
                  href={userData.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 transition-colors"
                >
                  <FaWhatsapp size={30} />
                </a>
              )}
              {userData?.twitter && (
                <a
                  href={userData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <FaTwitter size={30} />
                </a>
              )}
              {userData?.instagram && (
                <a
                  href={userData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors"
                >
                  <FaInstagram size={30} />
                </a>
              )}
              {userData?.facebook && (
                <a
                  href={userData.facebook}
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
