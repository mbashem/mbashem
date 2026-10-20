import { resume, sectionNumber } from "@/data/resume";
import type { Project } from "@/data/schema";
import { RichText, Section, SocialLinks, Stack } from "./shared";

function ProjectArtwork({ artwork }: { artwork: Project["artwork"] }) {
  if (!artwork) return null;
  return (
    <div className={`project-art ${artwork.type}-art`} aria-hidden="true">
      <div className="art-label">{artwork.label}</div>
      {artwork.type === "tracker" ? (
        <div className="tracker-grid">{Array.from({ length: 40 }, (_, index) => <i key={index} />)}</div>
      ) : (
        <svg viewBox="0 0 320 155" fill="none">
          <path d="M0 35H320M0 75H320M0 115H320" stroke="currentColor" opacity=".12" />
          <path d="M0 130 35 110 70 120 105 70 140 85 175 35 210 58 245 20 280 45 320 5V155H0Z" fill="currentColor" opacity=".09" />
          <path d="m0 130 35-20 35 10 35-50 35 15 35-50 35 23 35-38 35 25 40-40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M175 10V155" stroke="currentColor" strokeDasharray="3 5" opacity=".4" />
          <circle cx="175" cy="35" r="6" fill="currentColor" />
        </svg>
      )}
      <p><RichText>{artwork.title}</RichText></p><small>{artwork.caption}</small>
    </div>
  );
}

export function Projects() {
  const { projects } = resume;
  if (!projects.items.length) return null;

  return (
    <Section id="projects" number={sectionNumber("projects")} copy={projects}>
      {projects.items.map((project, index) => (
        <article className="project" key={index}>
          <ProjectArtwork artwork={project.artwork} />
          <div className="project-copy">
            <p className="eyebrow">
              {String(index + 1).padStart(2, "0")} / {project.category}{project.period && ` · ${project.period}`}
            </p>
            <h3>{project.name}</h3>
            {project.paragraphs.map((item, itemIndex) => <p key={itemIndex}><RichText>{item}</RichText></p>)}
            <Stack items={project.stack} />
            <div className="project-links"><SocialLinks items={project.links} /></div>
          </div>
        </article>
      ))}
    </Section>
  );
}
