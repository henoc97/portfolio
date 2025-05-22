"use client";
import React, { useState, useEffect } from "react";

import Project from "@/app/application/models/project";
import projectService from "@/app/application/services/project.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardFooter } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { handleUpload } from "@/app/application/services/upload-image.service";

const AdminProject: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    github: "",
    demo: "",
    category: "",
  });
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(
    null
  );

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await projectService.getProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  const _handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = await handleUpload(event.target.files[0]);
      setNewProject({ ...newProject, image: imageUrl });
    }
  };

  const handleCreateProject = async () => {
    const { title, description, image, github, demo, category } = newProject;

    if (
      title?.trim() &&
      description?.trim() &&
      image?.trim() &&
      github?.trim() &&
      demo?.trim() &&
      category?.trim()
    ) {
      try {
        console.log("Creating project with:", newProject);
        const createdProject = await projectService.createProject(
          newProject as Project
        );
        setProjects([...projects, createdProject]);
        setNewProject({
          title: "",
          description: "",
          image: "",
          github: "",
          demo: "",
          category: "",
        });
      } catch (err) {
        console.error("Erreur lors de la création du projet :", err);
      }
    } else {
      console.error("Tous les champs doivent être remplis.");
    }
  };

  const handleUpdateProject = (project: Project) => {
    console.log("Updating project:", project);
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      image: project.image,
      github: project.github,
      demo: project.demo,
      category: project.category,
    });
  };

  const handleUpdate = async () => {
    if (editingProject && editingProject.id) {
      try {
        await projectService.updateProject({
          id: editingProject.id,
          title: editingProject.title || "",
          description: editingProject.description || "",
          image: editingProject.image || "",
          github: editingProject.github || "",
          demo: editingProject.demo || "",
          category: editingProject.category || "",
        });

        setProjects(
          projects.map((p) =>
            p.id === editingProject.id
              ? ({ ...editingProject, id: editingProject.id } as Project)
              : p
          )
        );

        setNewProject({
          title: "",
          description: "",
          image: "",
          github: "",
          demo: "",
          category: "",
        });
        setEditingProject(null);
      } catch (error) {
        console.error("Error updating project:", error);
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
            type="file"
            accept="image/*"
            placeholder="Image URL"
            onChange={_handleImageUpload}
          />
          <Input
            placeholder="GitHub URL"
            value={newProject.github}
            onChange={(e) =>
              setNewProject({ ...newProject, github: e.target.value })
            }
          />
          <Input
            placeholder="Demo URL"
            value={newProject.demo}
            onChange={(e) =>
              setNewProject({ ...newProject, demo: e.target.value })
            }
          />
          <select
            className="border rounded p-2 w-full mb-4"
            value={newProject.category}
            onChange={(e) =>
              setNewProject({ ...newProject, category: e.target.value })
            }
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Fullstack">Fullstack</option>
            <option value="Data Science">Data science</option>
          </select>
          <p></p>
          <Button onClick={editingProject ? handleUpdate : handleCreateProject}>
            {editingProject ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#11101D]">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>
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
