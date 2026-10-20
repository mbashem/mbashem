import rawResume from "./resume.json";
import { resumeSchema } from "./schema";

export const resume = resumeSchema.parse(rawResume);
export const siteUrl = `${resume.site.url.replace(/\/$/, "")}/`;

export const navigation = [
  { id: "about", label: resume.about.navLabel },
  ...(resume.experience.items.length ? [{ id: "experience", label: resume.experience.navLabel }] : []),
  ...(resume.projects.items.length ? [{ id: "projects", label: resume.projects.navLabel }] : []),
  { id: "achievements", label: resume.achievements.navLabel },
  { id: "contact", label: resume.contact.navLabel },
];

export function sectionNumber(id: string) {
  return navigation.findIndex((item) => item.id === id) + 1;
}

export function publicAsset(path: string) {
  return `./${path}`;
}
