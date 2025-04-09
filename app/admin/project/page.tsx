"use client";
import React, { useState, useEffect } from "react";

import Project from "@/app/application/models/project";
import projectService from "@/app/application/services/project.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const AdminProject: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await projectService.getProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (newProject.title && newProject.description && newProject.link) {
      const createdProject = await projectService.createProject(
        newProject as Project
      );
      setProjects([...projects, createdProject]);
      setNewProject({ title: "", description: "", link: "" });
    }
  };

  const handleUpdateProject = async (project: Project) => {
    await projectService.updateProject(project);
    setProjects(projects.map((p) => (p.id === project.id ? project : p)));
  };

  const handleDeleteProject = async (id: string) => {
    await projectService.deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Project</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />
          <Textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <Input
            placeholder="Link"
            value={newProject.link}
            onChange={(e) =>
              setNewProject({ ...newProject, link: e.target.value })
            }
          />
          <Button onClick={handleCreateProject}>Create Project</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {project.title}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link}
                </a>
              </CardContent>
              <CardFooter className="flex space-x-4">
                <Button onClick={() => handleUpdateProject(project)}>
                  Update
                </Button>
                <Button onClick={() => handleDeleteProject(project.id!)}>
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

export default AdminProject;
