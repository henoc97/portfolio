"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./home/page";
import AdminDashboard from "./admin/page";
import AdminBlog from "./admin/blog/page";
import AdminCertificate from "./admin/certificate/page";
import AdminSkill from "./admin/skill/page";
import AdminProject from "./admin/project/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <AdminBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/certificate"
          element={
            <ProtectedRoute>
              <AdminCertificate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skill"
          element={
            <ProtectedRoute>
              <AdminSkill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/project"
          element={
            <ProtectedRoute>
              <AdminProject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
