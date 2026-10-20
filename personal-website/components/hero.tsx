import { publicAsset, resume } from "@/data/resume";
import { RichText } from "./shared";

export function Hero() {
  const { hero, profile, experience, projects } = resume;
  const current = experience.items.find((job) => job.current);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-top">
        <span className="eyebrow">{hero.label}</span>
        <a className="text-link" href={`mailto:${profile.email}`}>Say hello <span aria-hidden="true">↗</span></a>
      </div>
      <h1 id="hero-title"><RichText>{hero.title}</RichText><br /><em><RichText>{hero.accent}</RichText></em></h1>
      <p className="intro"><RichText>{hero.intro}</RichText></p>
      {current && (
        <div className="current-role">
          <span className="status-dot" aria-hidden="true" />
          <p>{current.roles[0].title}<br /><strong>{current.company}</strong></p>
        </div>
      )}
      <div className="hero-actions">
        {projects.items.length > 0 && (
          <a className="button" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
        )}
        <a className="text-link" href={publicAsset(resume.resume.path)}>View resume <span aria-hidden="true">↗</span></a>
      </div>
      <div className="hero-footnote">{hero.specialties.map((item, index) => <span key={index}>{item}</span>)}</div>
    </section>
  );
}
