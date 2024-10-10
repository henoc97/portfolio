import { useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A fullstack e-commerce solution built with React, Node.js, and MongoDB.',
    image: '/img/tof.JPG?height=200&width=300',
    github: 'https://github.com',
    demo: 'https://example.com',
    category: 'Fullstack',
  },
  {
    title: 'Sentiment Analysis Tool',
    description: 'A machine learning model for sentiment analysis of customer reviews.',
    image: '/img/tof.JPG?height=200&width=300',
    github: 'https://github.com',
    demo: 'https://example.com',
    category: 'Data Science',
  },
  // Add more projects here
]

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="flex justify-center mb-8">
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === 'All' ? 'bg-[#FFAA00] text-[#11101D]' : 'bg-[#F5F5F5] text-[#11101D]'
            }`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === 'Fullstack' ? 'bg-[#FFAA00] text-[#11101D]' : 'bg-[#F5F5F5] text-[#11101D]'
            }`}
            onClick={() => setFilter('Fullstack')}
          >
            Fullstack
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              filter === 'Data Science' ? 'bg-[#FFAA00] text-[#11101D]' : 'bg-[#F5F5F5] text-[#11101D]'
            }`}
            onClick={() => setFilter('Data Science')}
          >
            Data Science
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#11101D]">{project.title}</h3>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}