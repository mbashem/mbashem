import { navigation, publicAsset, resume } from "@/data/resume";
import { RichText, SocialLinks } from "./shared";

export function Sidebar() {
  const { profile, resume: pdf } = resume;
  const updated = new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${pdf.updated}T00:00:00Z`));

  return (
    <header className="sidebar">
      <div className="identity">
        <p className="eyebrow">{profile.headline}</p>
        <p className="sidebar-name"><RichText>{profile.displayName}</RichText></p>
        <p className="location"><span aria-hidden="true">↗</span> {profile.location}</p>
      </div>
      <nav aria-label="Main navigation">
        {navigation.map((item, index) => (
          <a href={`#${item.id}`} key={item.id}>
            <span>{String(index + 1).padStart(2, "0")}</span> {item.label}
          </a>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <a className="resume-link" href={publicAsset(pdf.path)} download={pdf.downloadName}>
          Download resume <span aria-hidden="true">↓</span>
        </a>
        <div className="social-links"><SocialLinks items={profile.links} /></div>
        <p className="small-note">Resume updated <time dateTime={pdf.updated}>{updated}</time></p>
      </div>
    </header>
  );
}
