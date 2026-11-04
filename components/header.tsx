"use client"

import { useState, useEffect } from "react"
import { Menu, X, Download, Languages, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Houssam_Eddine_Ben_Kheder_CV.pdf"
    link.download = "Houssam_Eddine_Ben_Kheder_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const navItems = [
    { number: "01", label: t("about"), id: "about" },
    { number: "02", label: t("experience"), id: "experience" },
    { number: "03", label: t("technologies"), id: "technologies" },
    { number: "04", label: t("projects"), id: "projects" },
    { number: "05", label: t("contact"), id: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between py-5">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold text-primary hover:scale-110 transition-transform duration-300"
          >
            HK
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm hover:text-primary transition-colors duration-300 group"
                >
                  <span className="text-primary font-mono text-xs mr-1">{item.number}.</span>
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>
              </li>
            ))}
            <li>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </li>
            <li>
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Languages className="w-4 h-4 mr-2" />
                {language === "fr" ? t("languageShortFr") || "FR" : t("languageShortEn") || "EN"}
              </Button>
            </li>
            <li>
              <Button
                onClick={downloadCV}
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                CV
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary hover:scale-110 transition-transform duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 animate-in fade-in slide-in-from-top-5 duration-300">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm hover:text-primary transition-colors duration-300 w-full text-left"
                  >
                    <span className="text-primary font-mono text-xs mr-1">{item.number}.</span>
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10 w-full justify-start transition-all duration-300"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      {t("lightMode")}
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      {t("darkMode")}
                    </>
                  )}
                </Button>
              </li>
              <li>
                <Button
                  onClick={toggleLanguage}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10 w-full justify-start transition-all duration-300"
                >
                  <Languages className="w-4 h-4 mr-2" />
                  {language === "fr" ? t("languageShortFr") || "FR" : t("languageShortEn") || "EN"}
                </Button>
              </li>
              <li>
                <Button
                  onClick={downloadCV}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-background w-full transition-all duration-300 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("downloadCV")}
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
