import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="about"
      className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative z-10"
    >
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/img/0.png"
          alt="John Smith"
          width={400}
          height={400}
          className="rounded-full shadow-lg"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hénoc AMAVIGAN</h1>
        <h2 className="text-2xl md:text-3xl text-[#FFAA00] mb-4">
          Fullstack Developer & Data Scientist
        </h2>
        <p className="text-xl mb-8">
          Transformer des données complexes en solutions élégantes
        </p>
        <a
          href="#projects"
          className="inline-flex items-center bg-[#FFAA00] text-[#11101D] px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-200"
        >
          View my projects
          <ArrowRight className="ml-2" size={20} />
        </a>
      </div>
    </section>
  );
}
