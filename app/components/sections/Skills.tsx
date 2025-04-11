import { useState, useEffect } from "react";
import { Code, Database, TrendingUp } from "lucide-react";

const skills = [
  { name: "JavaScript", category: "Development", level: 90 },
  { name: "React", category: "Development", level: 85 },
  { name: "Node.js", category: "Development", level: 80 },
  { name: "Python", category: "Data Science", level: 95 },
  { name: "TensorFlow", category: "Data Science", level: 75 },
  { name: "SQL", category: "Database", level: 85 },
];

export default function Skills() {
  const [animated, setAnimated] = useState(false);

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
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#11101D]/40 backdrop-blur-sm backdrop-filter rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                {skill.category === "Development" && (
                  <Code className="text-[#FFAA00] mr-2" />
                )}
                {skill.category === "Data Science" && (
                  <TrendingUp className="text-[#FFAA00] mr-2" />
                )}
                {skill.category === "Database" && (
                  <Database className="text-[#FFAA00] mr-2" />
                )}
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#FFAA00] transition-all duration-1000 ease-out ${
                    animated ? "" : "w-0"
                  }`}
                  style={{ width: animated ? `${skill.level}%` : "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
