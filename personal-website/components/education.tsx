import { resume } from "@/data/resume";

export function Education() {
  return resume.education.map((item, index) => (
    <section className="section education" aria-labelledby={`education-${index}`} key={index}>
      <p className="eyebrow">Education</p>
      <div><h2 id={`education-${index}`}>{item.school}</h2><p>{item.degree}</p></div>
      <p className="education-date">{item.period}</p>
    </section>
  ));
}
