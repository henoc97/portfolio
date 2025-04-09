"use client";
import Skill from "@/app/application/models/skill";
import skillService from "@/app/application/services/skill.service";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AdminSkill: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: "",
    level: "",
  });

  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await skillService.getSkills();
      setSkills(skills);
    };
    fetchSkills();
  }, []);

  const handleCreateSkill = async () => {
    if (newSkill.name && newSkill.level) {
      const createdSkill = await skillService.createSkill(newSkill as Skill);
      setSkills([...skills, createdSkill]);
      setNewSkill({ name: "", level: "" });
    }
  };

  const handleUpdateSkill = async (skill: Skill) => {
    await skillService.updateSkill(skill);
    setSkills(skills.map((s) => (s.id === skill.id ? skill : s)));
  };

  const handleDeleteSkill = async (id: string) => {
    await skillService.deleteSkill(id);
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Skill</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Skill</h2>
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <Input
            placeholder="Level"
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({ ...newSkill, level: e.target.value })
            }
          />
          <Button onClick={handleCreateSkill}>Create Skill</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Skills</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {skill.name}
                </CardTitle>
                <CardDescription>Level: {skill.level}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Level: {skill.level}</p>
              </CardContent>
              <CardFooter className="flex space-x-4">
                <Button onClick={() => handleUpdateSkill(skill)}>Update</Button>
                <Button onClick={() => handleDeleteSkill(skill.id!)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSkill;
