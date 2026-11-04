import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Technologies from "@/components/technologies"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Experience />
        <Technologies />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
