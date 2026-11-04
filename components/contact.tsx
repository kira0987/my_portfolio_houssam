"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-card/30">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center justify-center gap-4">
          <span className="text-primary font-mono text-xl md:text-2xl">05.</span>
          <span>{t("contact")}</span>
        </h2>

        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("stayInTouch")}</h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t("contactIntro")}</p>
          </div>

          <div className="space-y-4 py-6">
            <a
              href={`mailto:${t("email")}`}
              className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
            >
              <Mail size={20} />
              <span className="font-mono text-sm">{t("email")}</span>
            </a>
            <a
              href={`tel:${t("phone")}`}
              className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
            >
              <Phone size={20} />
              <span className="font-mono text-sm">{t("phone")}</span>
            </a>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <MapPin size={20} />
              <span className="font-mono text-sm">{t("location")}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 px-10 mt-8"
            asChild
          >
            <a href={`mailto:${t("email")}`}>{t("sendMessage")}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
