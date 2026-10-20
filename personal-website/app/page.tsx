import { About } from "@/components/about";
import { BackToTop } from "@/components/back-to-top";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Sidebar } from "@/components/sidebar";
import { resume } from "@/data/resume";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="layout">
        <Sidebar />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Achievements />
          <Education />
          <Contact />
          <footer>
            <span>© {new Date().getUTCFullYear()} {resume.profile.name}</span>
            <BackToTop>Back to top ↑</BackToTop>
          </footer>
        </main>
      </div>
    </>
  );
}
