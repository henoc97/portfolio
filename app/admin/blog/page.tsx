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
    content: "",
    date: new Date(),
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getBlogs();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  const handleCreateBlog = async () => {
    if (newBlog.title && newBlog.content) {
      const createdBlog = await blogService.createBlog(newBlog as Blog);
      setBlogs([...blogs, createdBlog]);
      setNewBlog({ title: "", content: "", date: new Date() });
    }
  };

  const handleUpdateBlog = async (blog: Blog) => {
    await blogService.updateBlog(blog);
    setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
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
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
          />
          <Button onClick={handleCreateBlog}>Create Blog</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {blog.title}
                </CardTitle>
                <CardDescription>{blog.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{blog.content}</p>
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
