"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative">
      <div
        className={`max-w-4xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-primary font-mono text-sm md:text-base mb-6 animate-in fade-in slide-in-from-left-5 duration-700">
          {t("hello")}
        </p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-left-5 duration-700 delay-100">
          {t("fullName") || "Houssam Eddine Ben Kheder"}
        </h1>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-left-5 duration-700 delay-200 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-rainbow bg-[length:200%_auto]">
          {t("title")}
        </h2>

        <div className="flex items-center gap-2 mb-8 text-muted-foreground animate-in fade-in slide-in-from-left-5 duration-700 delay-250">
          <MapPin size={18} className="text-primary" />
          <span className="text-sm md:text-base">{t("location")}</span>
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-left-5 duration-700 delay-300">
          {t("description").replace("ESPRIT", t("esprit"))}
        </p>

        <div className="flex flex-wrap gap-6 items-center animate-in fade-in slide-in-from-left-5 duration-700 delay-500">
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 px-8"
          >
            {t("contactMe")}
          </Button>

          <div className="flex gap-5">
            <a
              href="https://github.com/kira0987"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/houssam-eddine-ben-kheder-101230220"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:houssameddine.benkheder@esprit.tn"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  )
}
