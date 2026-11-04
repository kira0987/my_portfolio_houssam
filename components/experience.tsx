"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar } from "lucide-react"

import { useLanguage } from "@/lib/language-context"

function getExperiences(t: (key: string) => string) {
  return [
    {
      title: t("exp1_title"),
      company: t("exp1_company"),
      period: t("exp1_period"),
      description: [
        t("exp1_desc_0"),
        t("exp1_desc_1"),
        t("exp1_desc_2"),
        t("exp1_desc_3"),
        t("exp1_desc_4"),
        t("exp1_desc_5"),
        t("exp1_desc_6"),
      ],
    },
    {
      title: t("exp2_title"),
      company: t("exp2_company"),
      period: t("exp2_period"),
      description: [
        t("exp2_desc_0"),
        t("exp2_desc_1"),
        t("exp2_desc_2"),
        t("exp2_desc_3"),
      ],
    },
    {
      title: t("exp3_title"),
      company: t("exp3_company"),
      period: t("exp3_period"),
      description: [t("exp3_desc_0"), t("exp3_desc_1"), t("exp3_desc_2"), t("exp3_desc_3")],
    },
  ]
}

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const experiences = getExperiences(t)

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
    <section id="experience" ref={sectionRef} className="py-24 md:py-32">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-primary font-mono text-xl md:text-2xl">02.</span>
          <span>{t("experienceTitle")}</span>
          <span className="flex-1 h-px bg-border ml-4"></span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Company tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`px-6 py-3 text-left whitespace-nowrap border-l-2 transition-all ${
                  activeIndex === index
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Experience details */}
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2">
                  {experiences[activeIndex].title}
                  <span className="text-primary">@ {experiences[activeIndex].company}</span>
                </h3>
                <p className="text-sm text-muted-foreground font-mono flex items-center gap-2 mt-2">
                  <Calendar size={16} />
                  {experiences[activeIndex].period}
                </p>
              </div>
              <ul className="space-y-3">
                {experiences[activeIndex].description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
