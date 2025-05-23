import { useEffect, useState } from "react";
import Link from "next/link";
import blurData from "@/public/img/blur-data.json";
import Image from "next/image";
import blogService from "@/app/application/services/blog.service";
import Blog from "@/app/application/models/blog";

export default function Blogs() {
  const [filter, setFilter] = useState("Tous");
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const blogPosts = await blogService.getBlogs();
      setBlogPosts(blogPosts);
    };
    fetchBlogPosts();
  }, []);

  const filteredPosts =
    filter === "Tous"
      ? blogPosts
      : blogPosts.filter((p) => p.category === filter);

  return (
    <section id="blog" className="relative py-20">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/3.png"
          alt="Background"
          fill
          priority
          placeholder="blur"
          blurDataURL={blurData["3.png"]}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#F5F5F5]">
          Blog
        </h2>
        <div className="flex justify-center mb-8">
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === "Tous"
                ? "bg-[#FFAA00] text-[#11101D]"
                : "bg-[#11101D] text-[#F5F5F5]"
            }`}
            onClick={() => setFilter("Tous")}
          >
            Tous
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
            Science des Données
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
                  <span className="text-sm text-gray-500">
                    {post.date.toLocaleDateString("fr-FR")}
                  </span>
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    Lire la suite
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
