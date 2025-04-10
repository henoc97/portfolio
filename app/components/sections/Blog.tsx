import { useState } from "react";
import Link from "next/link";

const blogPosts = [
  {
    title: "Building Scalable Web Applications with React and Node.js",
    excerpt:
      "Learn how to create robust and scalable web applications using React for the frontend and Node.js for the backend.",
    date: "2023-05-15",
    category: "Fullstack",
  },
  {
    title: "Introduction to Machine Learning with Python",
    excerpt:
      "Dive into the world of machine learning using Python and popular libraries like scikit-learn and TensorFlow.",
    date: "2023-05-01",
    category: "Data Science",
  },
  // Add more blog posts here
];

export default function Blog() {
  const [filter, setFilter] = useState("All");

  const filteredPosts =
    filter === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === filter);

  return (
    <section id="blog" className="relative py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/3.png')",
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#F5F5F5]">
          Blog
        </h2>
        <div className="flex justify-center mb-8">
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === "All"
                ? "bg-[#FFAA00] text-[#11101D]"
                : "bg-[#11101D] text-[#F5F5F5]"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === "Fullstack"
                ? "bg-[#FFAA00] text-[#11101D]"
                : "bg-[#11101D] text-[#F5F5F5]"
            }`}
            onClick={() => setFilter("Fullstack")}
          >
            Fullstack
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === "Data Science"
                ? "bg-[#FFAA00] text-[#11101D]"
                : "bg-[#11101D] text-[#F5F5F5]"
            }`}
            onClick={() => setFilter("Data Science")}
          >
            Data Science
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#11101D]">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link
                    href={`/blog/${post.title
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
