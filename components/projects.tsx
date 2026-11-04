"use client"

import { useState } from "react"
import { Folder, PlayCircle } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ProjectMedia = {
  src: string
  type: "image" | "video"
  alt: string
}

type ProjectDefinition = {
  id: number
  technologies: string[]
  media: ProjectMedia[]
}

const projectImages: Record<number, string[]> = {
  3: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e2664668-4155-4bad-9af8-1bd4df4d3666%20%281%29-D7LJEWpalGRuKFuDurZRilAywxxmeq.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d7963e36-4577-424b-894a-090b1e3fa0ab-itHsQJyN6bniRtndrumrhtH7JqpUvB.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/91bf2c0b-1821-4e44-976b-560c01b9ccd8-Fl0reHEyFpK0EmrfXcDNdjb7pjXpX5.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/61dc2f19-85f0-42e0-9149-de3fa8fabb19-JVN5eCKNWyJU68ENXHwYSBTq6aUs1I.jpg",
  ],
  4: ["/images/duexpert-1.png", "/images/duexpert-2.png", "/images/duexpert-3.png", "/images/duexpert-4.png"],
  5: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/t1-XP7EH1VtIkLlWO7vVlqFLXivlRticb.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/t2-hbFsIxrxUe5eEqhY1KK0UQKaITbzwa.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/t3-DsJ4pyb8n1CsejODqPx7K6e2i8p3st.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/t4-SqDb2R5tXset1hzbduRJwctjQ1mRTN.jpg",
  ],
  6: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v1-2mB8MeCudhqur25JECwMZ4BZ7MG0QJ.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v2-lxSb2082MLLZs01FtdVnV6HeJkdaeu.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v3-UYIKNM93BmWHOB0W0KHozzrPIXoBrP.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v4-UlZbDXXJ7XjUeQBkzh64l74IX45sOV.jpg",
  ],
  7: ["/images/intro.png", "/images/kmeans.png", "/images/shap.png", "/images/smote.png"],
}

const legacyProjectTechnologies: Record<number, string[]> = {
  3: ["Python", "Monte Carlo", "Event Testing", "CTGAN", "KNN", "Agentic Chatbot", "Geomarketing"],
  4: ["Python", "LLMs", "RAG", "LangChain", "MongoDB", "LSTM", "GPU Inference", "PPTX Reporting"],
  5: ["Python", "CNN", "VGG16", "MRI", "Image Classification"],
  6: ["Python", "ResNet-50", "Diffusion Models", "Mel Spectrograms", "EmoDB", "RAVDESS", "Random Forest", "MLP"],
  7: [
    "Python",
    "SMOTE+ENN",
    "Logistic Regression",
    "SVC",
    "Gradient Boosting",
    "XGBoost",
    "AdaBoost",
    "Neural Network",
    "SHAP",
    "K-Means",
    "MLflow",
    "FastAPI",
    "Flask",
    "Makefile",
  ],
}

const projectDefinitions: ProjectDefinition[] = [
  {
    id: 1,
    technologies: [
      "LangChain",
      "YOLOv10",
      "GPT-4o Vision",
      "multilingual-e5-large",
      "pgvector",
      "PostgreSQL",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Docker",
      "Laminar",
    ],
    media: [
      { src: "/images/example_page_tn.png", type: "image", alt: "Tunisian equity research report page" },
      { src: "/images/frontend_2.png", type: "image", alt: "Multimodal RAG interface" },
      { src: "/images/frontend_5.png", type: "image", alt: "Multimodal RAG research workflow" },
      { src: "/images/frontend_6.png", type: "image", alt: "Multimodal RAG answer view" },
      { src: "/images/image_quality%20evaluation.png", type: "image", alt: "Image quality evaluation results" },
      { src: "/videos/PFE_Value.mp4", type: "video", alt: "Multimodal agentic RAG demo" },
    ],
  },
  {
    id: 2,
    technologies: [
      "TypeScript",
      "Next.js",
      "SQLite",
      "LangChain",
      "FastAPI",
      "Deterministic KPI rules",
      "LLM advisory",
    ],
    media: [
      { src: "/images/frontend_1_1.png", type: "image", alt: "Agentic CRM dashboard" },
      { src: "/images/frontend_1_3.png", type: "image", alt: "Client financial overview" },
      { src: "/images/frontend_1_4.png", type: "image", alt: "Relationship manager advisory view" },
      { src: "/videos/bdd.mp4", type: "video", alt: "Agentic CRM demo" },
    ],
  },
  ...[3, 4, 5, 6, 7].map((id) => ({
    id,
    technologies: legacyProjectTechnologies[id],
    media: projectImages[id].map((src, index) => ({
      src,
      type: "image" as const,
      alt: `Project ${id - 2} screenshot ${index + 1}`,
    })),
  })),
]

function getProjects(t: (key: string) => string) {
  return projectDefinitions.map((project) => ({
    ...project,
    title: t(`proj${project.id}_title`),
    period: t(`proj${project.id}_period`),
    description: t(`proj${project.id}_description`),
    highlights: [0, 1, 2, 3].map((index) => t(`proj${project.id}_highlight_${index}`)),
  }))
}

export default function Projects() {
  const { t } = useLanguage()
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null)
  const projects = getProjects(t)

  return (
    <Dialog
      open={selectedMedia !== null}
      onOpenChange={(open) => {
        if (!open) setSelectedMedia(null)
      }}
    >
      <section id="projects" className="py-24 md:py-32">
        <div
          className="opacity-100 translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="text-primary font-mono text-xl md:text-2xl">04.</span>
            <span>{t("projectsTitle")}</span>
            <span className="flex-1 h-[1px] bg-border ml-4 max-w-xs"></span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(34,197,94,0.3)] group ${
                  project.id <= 2 ? "md:col-span-2" : ""
                }`}
              >
                <CardHeader>
                  <div className="mb-4">
                    <Folder
                      size={40}
                      className="text-primary group-hover:text-primary/70 transition-colors duration-300"
                    />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-primary font-mono text-xs">{project.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                  <h4 className="mb-2 text-sm font-semibold text-foreground">{t("projectHighlights")}</h4>
                  <ul className="mb-6 space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex-shrink-0 text-primary">▹</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {project.media.map((media) => (
                      <button
                        key={media.src}
                        type="button"
                        onClick={() => setSelectedMedia(media)}
                        aria-label={`Preview ${media.alt}`}
                        className="relative aspect-video overflow-hidden rounded-md border border-border bg-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {media.type === "image" ? (
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <>
                            <video
                              src={media.src}
                              poster={project.media.find((item) => item.type === "image")?.src}
                              preload="none"
                              muted
                              playsInline
                              aria-hidden="true"
                              className="h-full w-full object-cover"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                              <PlayCircle size={38} aria-hidden="true" />
                            </span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>

                  <h4 className="mb-2 text-sm font-semibold text-foreground">{t("projectTechStack")}</h4>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded border border-primary/20 bg-primary/5 px-2 py-1 text-xs font-mono text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DialogContent className="w-[calc(100%-2rem)] max-w-5xl p-3 sm:p-5">
        {selectedMedia && (
          <>
            <DialogHeader>
              <DialogTitle>{selectedMedia.alt}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {selectedMedia.type === "image" ? t("imagePreviewDescription") : t("videoPreviewDescription")}
            </DialogDescription>
            {selectedMedia.type === "image" ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <video
                key={selectedMedia.src}
                src={selectedMedia.src}
                controls
                autoPlay
                playsInline
                className="aspect-video max-h-[75vh] w-full rounded-md bg-black"
              >
                Your browser does not support video playback.
              </video>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
