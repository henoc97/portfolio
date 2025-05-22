"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <nav className="bg-white bg-opacity-30 backdrop-blur-md p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <Link href="/admin/blog">
              <Button>Blog</Button>
            </Link>
            <Link href="/admin/certificate">
              <Button>Certificate</Button>
            </Link>
            <Link href="/admin/skill">
              <Button>Skill</Button>
            </Link>
            <Link href="/admin/project">
              <Button>Project</Button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-16 p-4">
        <h1>Admin Dashboard</h1>
        <p>Bienvenue sur le tableau de bord administrateur.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
