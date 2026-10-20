import { resume, sectionNumber } from "@/data/resume";
import { RichText, SocialLinks } from "./shared";

export function Contact() {
  const { contact, profile } = resume;
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow">{String(sectionNumber("contact")).padStart(2, "0")} / {contact.label}</p>
      <h2 id="contact-title"><RichText>{contact.title}</RichText><br /><em><RichText>{contact.accent}</RichText></em></h2>
      <p><RichText>{contact.description}</RichText></p>
      <a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
      <div className="contact-links">
        <SocialLinks items={profile.links} />
        {profile.phone && <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a>}
      </div>
    </section>
  );
}
