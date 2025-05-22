"use client";
import blogService from "@/app/application/services/blog.service";
import Blog from "@/app/application/models/blog";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
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

const AdminBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({
    title: "",
    excerpt: "",
    link: "",
    category: "",
    date: new Date(),
  });
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getBlogs();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  const handleCreateBlog = async () => {
    if (newBlog.title && newBlog.excerpt && newBlog.category) {
      const createdBlog = await blogService.createBlog(newBlog as Blog);
      setBlogs([...blogs, createdBlog]);
      setNewBlog({
        title: "",
        excerpt: "",
        link: "",
        category: "",
        date: new Date(),
      });
    }
  };

  const handleUpdateBlog = (blog: Blog) => {
    setNewBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      link: blog.link,
      category: blog.category,
      date: blog.date,
    });
    setEditingBlog(blog);
  };

  const handleUpdate = async () => {
    if (editingBlog && editingBlog.id) {
      try {
        const updatedBlog: Blog = {
          id: editingBlog.id,
          title: newBlog.title || "",
          excerpt: newBlog.excerpt || "",
          link: newBlog.link || "",
          category: newBlog.category || "",
          date: new Date(), // tu peux choisir d'utiliser newBlog.date si tu veux le conserver
        };

        await blogService.updateBlog(updatedBlog);

        setBlogs(blogs.map((b) => (b.id === editingBlog.id ? updatedBlog : b)));

        // Réinitialisation
        setNewBlog({
          title: "",
          excerpt: "",
          link: "",
          category: "",
          date: new Date(),
        });
        setEditingBlog(null);
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  };

  const handleDeleteBlog = async (id: string) => {
    await blogService.deleteBlog(id);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Blog</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <Textarea
            placeholder="Excerpt"
            value={newBlog.excerpt}
            onChange={(e) =>
              setNewBlog({ ...newBlog, excerpt: e.target.value })
            }
          />
          <Input
            placeholder="Link"
            value={newBlog.link}
            onChange={(e) => setNewBlog({ ...newBlog, link: e.target.value })}
          />
          <select
            className="border rounded p-2 w-full mb-4"
            value={newBlog.category}
            onChange={(e) =>
              setNewBlog({ ...newBlog, category: e.target.value })
            }
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Fullstack">Fullstack</option>
            <option value="Data Science">Data science</option>
          </select>
          <Button onClick={editingBlog ? handleUpdate : handleCreateBlog}>
            {editingBlog ? "Update Blog" : "Create Blog"}
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {blog.title}
                </CardTitle>
                <CardDescription>{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {blog.date.toLocaleDateString()}
                  </span>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    Read more
                  </a>
                </div>
              </CardContent>
              <CardFooter className="flex space-x-4">
                <Button onClick={() => handleUpdateBlog(blog)}>Update</Button>
                <Button onClick={() => handleDeleteBlog(blog.id!)}>
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

export default AdminBlog;
