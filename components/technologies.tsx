"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const technologies = [
  { category: "tech_cat_languages", items: ["Python", "SQL", "JavaScript", "TypeScript"] },
  {
    category: "tech_cat_ai",
    items: [
      "LLMs",
      "Agentic AI",
      "Multimodal RAG",
      "Computer Vision",
      "NLP",
      "Time Series",
      "Synthetic Data",
      "Deterministic Financial KPIs",
    ],
  },
  {
    category: "tech_cat_frameworks",
    items: [
      "LangChain",
      "LlamaIndex",
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "OpenCV",
      "Scikit-learn",
      "Next.js",
      "Mesa",
      "Dash",
      "Plotly",
      "Flask",
    ],
  },
  {
    category: "tech_cat_models",
    items: [
      "Transformers",
      "GPT-4o / GPT-4o Vision",
      "LLaMA",
      "BERT",
      "ResNet-50",
      "VGG16",
      "YOLOv10",
      "CTGAN",
      "LSTM",
      "KNN",
      "Gradient Boosting",
      "XGBoost",
      "AdaBoost",
    ],
  },
  {
    category: "tech_cat_backend",
    items: [
      "FastAPI",
      "Django REST API",
      "Docker",
      "CI/CD",
      "Git",
      "Laminar",
      "MLflow",
      "MLflow Model Registry",
      "Makefile",
    ],
  },
  {
    category: "tech_cat_data",
    items: [
      "PostgreSQL",
      "MongoDB",
      "pgvector",
      "SQLite",
      "Vector Databases",
      "Hybrid Search",
      "Full-text Search",
      "ETL",
      "Power BI",
    ],
  },
  {
    category: "tech_cat_spoken",
    items: ["spoken_arabic", "spoken_french", "spoken_english"],
  },
]

export default function Technologies() {
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
    <section id="technologies" ref={sectionRef} className="py-24 md:py-32">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-primary font-mono text-xl md:text-2xl">03.</span>
          <span>{t("technologiesTitle")}</span>
          <span className="flex-1 h-px bg-border ml-4"></span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">{t(tech.category)}</h3>
              <ul className="space-y-2">
                {tech.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary">▹</span>
                    {item.startsWith("spoken_") ? t(item) : item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
