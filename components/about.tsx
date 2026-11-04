"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function About() {
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
    <section id="about" ref={sectionRef} className="py-24 md:py-32">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-primary font-mono text-xl md:text-2xl">01.</span>
          <span>{t("aboutTitle")}</span>
          <span className="flex-1 h-[1px] bg-border ml-4 max-w-xs"></span>
        </h2>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {t("aboutP1").includes(t("fullName"))
                ? t("aboutP1").split(t("fullName")).map((part, idx, arr) =>
                    idx < arr.length - 1 ? (
                      <span key={`name-part-${idx}`}>
                        {part}
                        <span className="text-primary font-semibold">{t("fullName")}</span>
                      </span>
                    ) : (
                      <span key={`name-part-${idx}`}>{part}</span>
                    ),
                  )
                : t("aboutP1")}
            </p>
            <p>
              {t("aboutP2").split("Python").map((part, idx, arr) =>
                idx < arr.length - 1 ? (
                  <span key={`py-part-${idx}`}>
                    {part}
                    <span className="text-primary">Python</span>
                  </span>
                ) : (
                  <span key={`py-part-${idx}`}>{part}</span>
                ),
              )}
              {" "}
              {" "}
              {" "}
            </p>
            <p>
              {t("aboutP3").replace("IA", t("aiAbbr")).split(t("aiAbbr")).map((part, idx, arr) =>
                idx < arr.length - 1 ? (
                  <span key={`ai-part-${idx}`}>
                    {part}
                    <span className="text-primary">{t("aiAbbr")}</span>
                  </span>
                ) : (
                  <span key={`ai-part-${idx}`}>{part}</span>
                ),
              )}
              {" "}
              <span className="text-primary">Data Science</span>
            </p>

            <div className="pt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{t("education")}</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 hover:border-primary/70 transition-colors duration-300">
                    <p className="text-sm text-primary font-mono">{t("degree1_date")}</p>
                    <p className="font-semibold text-foreground">{t("degree1_title")}</p>
                    <p className="text-sm text-muted-foreground">{t("degree1_institution")}</p>
                  </div>

                  <div className="border-l-2 border-muted pl-4 hover:border-primary transition-colors duration-300">
                    <p className="text-sm text-primary font-mono">{t("degree2_date")}</p>
                    <p className="font-semibold text-foreground">{t("degree2_title")}</p>
                    <p className="text-sm text-muted-foreground">{t("degree2_institution")}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{t("languages")}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 hover:text-primary transition-colors duration-300">
                    <span className="text-primary mt-1">▹</span>
                    <span>{t("lang_arabic")}</span>
                  </li>
                  <li className="flex items-start gap-2 hover:text-primary transition-colors duration-300">
                    <span className="text-primary mt-1">▹</span>
                    <span>{t("lang_french")}</span>
                  </li>
                  <li className="flex items-start gap-2 hover:text-primary transition-colors duration-300">
                    <span className="text-primary mt-1">▹</span>
                    <span>{t("lang_english")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="relative z-10 aspect-square rounded-lg overflow-hidden bg-card border-2 border-primary/30 hover:border-primary transition-all duration-300">
              <Image
                src="/images/houssam.png.jpg"
                alt={t("fullName")}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
