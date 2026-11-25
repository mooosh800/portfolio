import About from '@/components/About'
import Contact from '@/components/Contact'
import Expertise from '@/components/Expertise'
import Experience from '@/components/Experience'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Process from '@/components/Process'
import Work from '@/components/Work'
import { projects } from '@/data/projects'

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Marquee items={['Creative Direction', 'Visual Thinking', 'Brand Identity', 'Art Direction', 'Visual Storytelling']} />
      <About />
      <Work />
      <Expertise />
      <Marquee
        items={['Research', 'Concept', 'Strategy', 'Art Direction', 'Execution', 'Refinement']}
        accentEvery={4}
      />
      <Process />
      <Experience />
      <Contact />
      <div className="sr-only">
        {projects.map((project) => (
          <span key={project.id}>{project.title}</span>
        ))}
      </div>
    </main>
  )
}
