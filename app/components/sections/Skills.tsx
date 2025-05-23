import { useState, useEffect } from "react";
import { Code, Database, TrendingUp } from "lucide-react";
import { Skill } from "../../application/models/skill";
import SkillService from "@/app/application/services/skill.service";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await SkillService.getSkills();
        setSkills(skillsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-[#11101D]/40 backdrop-blur-sm backdrop-filter rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                {skill.category === "Données/IA" ? (
                  <Database className="w-6 h-6 text-[#FFAA00] mr-2" />
                ) : skill.category === "Backends" ? (
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
