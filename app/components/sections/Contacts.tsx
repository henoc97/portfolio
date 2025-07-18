import { useState } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import blurData from "@/public/img/blur-data.json";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Amavigan henoc",
        to_email: "amaviganhenoc@gmail.com",
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      console.log("Email envoyé avec succès!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#11101D]/70 backdrop-blur-sm backdrop-filter text-[#F5F5F5] py-20"
    >
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="/img/5.png"
          alt="Background"
          fill
          priority
          placeholder="blur"
          blurDataURL={blurData["5.png"]}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Me Contacter</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#F5F5F5] mb-2"
            >
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-[#11101D] bg-[#F5F5F5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFAA00]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#F5F5F5] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-[#11101D] bg-[#F5F5F5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFAA00]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#F5F5F5] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 text-[#11101D] bg-[#F5F5F5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFAA00]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFAA00] text-[#11101D] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center"
          >
            Envoyer le message
            <Send className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
