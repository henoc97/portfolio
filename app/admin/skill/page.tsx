"use client";
import { Skill } from "@/app/application/models/skill";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import skillService from "@/app/application/services/skill.service";

const CATEGORIES = ["Données/IA", "Backends", "Frontends", "Langages"];

const AdminSkill: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: "",
    category: "",
    elements: [],
  });
  const [newElement, setNewElement] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await skillService.getSkills();
      setSkills(skills);
    };
    fetchSkills();
  }, []);

  const handleCreateSkill = async () => {
    if (newSkill.name && newSkill.category && newSkill.elements?.length) {
      const createdSkill = await skillService.createSkill(newSkill as Skill);
      setSkills([...skills, createdSkill]);
      setNewSkill({ name: "", category: "", elements: [] });
      setNewElement("");
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

  const addElement = () => {
    if (newElement.trim()) {
      setNewSkill({
        ...newSkill,
        elements: [...(newSkill.elements || []), newElement.trim()],
      });
      setNewElement("");
    }
  };

  const removeElement = (index: number) => {
    setNewSkill({
      ...newSkill,
      elements: newSkill.elements?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Administration des Compétences
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Créer une nouvelle compétence
        </h2>
        <div className="space-y-4">
          <Input
            placeholder="Nom de la compétence"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <Select
            value={newSkill.category}
            onValueChange={(value: string) =>
              setNewSkill({ ...newSkill, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un élément"
                value={newElement}
                onChange={(e) => setNewElement(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addElement()}
              />
              <Button onClick={addElement}>Ajouter</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newSkill.elements?.map((element, index) => (
                <div
                  key={index}
                  className="bg-secondary px-2 py-1 rounded-md flex items-center gap-2"
                >
                  <span>{element}</span>
                  <button
                    onClick={() => removeElement(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleCreateSkill}>Créer la compétence</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Compétences existantes</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {skill.name}
                </CardTitle>
                <CardDescription>Catégorie: {skill.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skill.elements.map((element, index) => (
                    <div
                      key={index}
                      className="bg-secondary px-2 py-1 rounded-md"
                    >
                      {element}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handleUpdateSkill(skill)}
                >
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSkill(skill.id!)}
                >
                  Supprimer
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
