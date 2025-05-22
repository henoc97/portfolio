import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import certificateService from "@/app/application/services/certificate.service";
import Certificate from "@/app/application/models/certificate";

export default function Certificates() {
  const [filter] = useState("Tous");
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificates = await certificateService.getCertificates();
      setCertificates(certificates);
    };
    fetchCertificates();
  }, []);

  const filteredProjects =
    filter === "Tous"
      ? certificates
      : certificates.filter((c) => c.name === filter);

  return (
    <section id="certificate" className="relative py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/4.png')",
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#F5F5F5]">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#11101D]">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
