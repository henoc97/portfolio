"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Code, BarChart2, Briefcase, FileText, Mail } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'About', href: '#about', icon: Code },
    { name: 'Skills', href: '#skills', icon: BarChart2 },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Blog', href: '#blog', icon: FileText },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-[#11101D] text-[#F5F5F5]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#11101D] shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#FFAA00]">
            JS
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#F5F5F5] hover:text-[#FFAA00] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-[#F5F5F5]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#11101D] md:hidden">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#F5F5F5] hover:text-[#FFAA00] transition-colors duration-200 text-2xl flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={24} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
      <main className="pt-16">{children}</main>
    </div>
  )
}