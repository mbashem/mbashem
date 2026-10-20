import { resume, sectionNumber } from "@/data/resume";
import { RichText, Section } from "./shared";

export function About() {
  const { about } = resume;
  return (
    <Section id="about" number={sectionNumber("about")} copy={about}>
      <div className="about-copy">
        {about.paragraphs.map((item, index) => <p key={index}><RichText>{item}</RichText></p>)}
      </div>
      <dl className="skills">
        {about.skills.map((skill, index) => (
          <div key={index}><dt>{skill.category}</dt><dd>{skill.items.join(" · ")}</dd></div>
        ))}
      </dl>
    </Section>
  );
}
