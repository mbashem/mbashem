import { z } from "zod";

const webUrl = z.url().refine(
  (value) => /^https?:\/\//.test(value),
  "Use an http:// or https:// URL",
);
const optionalUrl = webUrl.or(z.literal("")).optional();
const link = z.object({ label: z.string(), url: webUrl });
const section = z.object({
  navLabel: z.string(),
  label: z.string(),
  title: z.string(),
});
const strings = z.array(z.string());

export const resumeSchema = z.object({
  site: z.object({
    url: webUrl.refine((value) => {
      try {
        const url = new URL(value);
        return url.protocol === "https:" &&
          !url.search && !url.hash && !url.username && !url.password && !url.port;
      } catch {
        return false;
      }
    }, "Use an HTTPS site URL without credentials, a port, a query, or a fragment"),
    description: z.string(),
    socialDescription: z.string(),
  }),
  profile: z.object({
    name: z.string(), displayName: z.string(),
    headline: z.string(), location: z.string(), email: z.email(),
    phone: z.string(), phoneLabel: z.string(), links: z.array(link),
  }),
  resume: z.object({
    path: z.string().min(1).refine(
      (value) => !value.startsWith("/") && !value.includes("\\") &&
        !value.includes(":") && !value.split("/").includes(".."),
      "Use a relative file path inside public/",
    ),
    downloadName: z.string(),
    updated: z.iso.date(),
  }),
  hero: z.object({
    label: z.string(), title: z.string(), accent: z.string(),
    intro: z.string(), specialties: strings,
  }),
  about: section.extend({
    paragraphs: strings,
    skills: z.array(z.object({ category: z.string(), items: strings })),
  }),
  experience: section.extend({
    items: z.array(z.object({
      company: z.string(), url: optionalUrl, current: z.boolean(), location: z.string(),
      roles: z.array(z.object({
        title: z.string(), period: z.string(), note: z.string().optional(),
      })).min(1, "Add at least one role"),
      highlights: strings, recognition: strings, stack: strings,
    })),
  }),
  projects: section.extend({
    description: z.string(),
    items: z.array(z.object({
      name: z.string(), category: z.string(), period: z.string(),
      paragraphs: strings, stack: strings, links: z.array(link),
      artwork: z.object({
        type: z.enum(["tracker", "chart"]), label: z.string(),
        title: z.string(), caption: z.string(),
      }).optional(),
    })),
  }),
  achievements: section.extend({
    description: z.string(), ratingsNote: z.string(),
    ratings: z.array(z.object({
      platform: z.string(), rating: z.string(), rank: z.string(), url: webUrl,
    })),
    contests: z.array(z.object({
      place: z.string(), name: z.string(), detail: z.string(), url: optionalUrl,
    })),
    links: z.array(link),
  }),
  education: z.array(z.object({ school: z.string(), degree: z.string(), period: z.string() })),
  contact: section.extend({ accent: z.string(), description: z.string() }),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Profile = Resume["profile"];
export type WebsiteLink = z.infer<typeof link>;
export type SectionCopy = z.infer<typeof section> & { description?: string };
export type Project = Resume["projects"]["items"][number];
