import { resume, sectionNumber } from "@/data/resume";
import { ExternalLink, RichText, Section, Stack } from "./shared";

export function Experience() {
  const { experience } = resume;
  if (!experience.items.length) return null;

  return (
    <Section id="experience" number={sectionNumber("experience")} copy={experience}>
      {experience.items.map((job, index) => (
        <article className="job" key={index}>
          <div className="job-heading">
            <h3>{job.url ? <ExternalLink label={job.company} url={job.url} /> : job.company}</h3>
            {job.current && <span className="tag">Current</span>}
          </div>
          {job.roles.map((role, roleIndex) => (
            <div className={`role${roleIndex ? " previous" : ""}`} key={roleIndex}>
              <h4>{role.title}{role.note && <span className="muted"> · {role.note}</span>}</h4>
              <p>{role.period}</p>
            </div>
          ))}
          <p className="job-location">{job.location}</p>
          {job.highlights.length > 0 && (
            <ul className="detail-list">
              {job.highlights.map((item, itemIndex) => <li key={itemIndex}><RichText>{item}</RichText></li>)}
            </ul>
          )}
          {job.recognition.length > 0 && (
            <div className="recognition">
              <span className="eyebrow">Recognition</span>
              <RichText>{job.recognition.join("\n")}</RichText>
            </div>
          )}
          <Stack items={job.stack} />
        </article>
      ))}
    </Section>
  );
}
