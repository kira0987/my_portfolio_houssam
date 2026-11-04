"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
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
              href="https://www.linkedin.com/in/houssam-eddine-ben-kheder-101230220/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${t("email")}`}
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p className="font-mono">{t("copyright")}</p>
            <p className="mt-2 font-mono text-xs">
              {t("builtWith")} <span className="text-primary">Next.js</span> {"et"} <span className="text-primary">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
