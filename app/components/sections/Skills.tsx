import { useState, useEffect } from "react";
import { Code, Database, TrendingUp } from "lucide-react";

const skills = [
  {
    name: "Données/IA",
    elements: ["Machine Learning", "Deep Learning", "Tensorflow", "Keras"],
  },
  {
    name: "Backends",
    elements: ["Node.js", "Nest.js", "Kafka", "API Rest & GraphQL"],
  },
  { name: "Frontends", elements: ["Next.js", "Flutter"] },
  { name: "Langages", elements: ["TypeScript", "Python", "Java"] },
];

export default function Skills() {
  const [_, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("skills");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setAnimated(true);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#11101D]/40 backdrop-blur-sm backdrop-filter rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                {skill.name === "Données/IA" ? (
                  <Database className="w-6 h-6 text-[#FFAA00] mr-2" />
                ) : skill.name === "Backends" ? (
                  <Code className="w-6 h-6 text-[#FFAA00] mr-2" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-[#FFAA00] mr-2" />
                )}
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>
              <div>
                {skill.elements.map((element, index) => (
                  <ul key={index} className="list-disc ml-6">
                    <li>{element}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
