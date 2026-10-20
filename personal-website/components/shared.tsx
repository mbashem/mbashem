import { Fragment, type ReactNode } from "react";
import type { SectionCopy, WebsiteLink } from "@/data/schema";

export function RichText({ children }: { children: string }) {
  return children.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line.split(/(\*\*.+?\*\*)/g).map((part, partIndex) => (
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
          : <Fragment key={partIndex}>{part}</Fragment>
      ))}
    </Fragment>
  ));
}

export function ExternalLink({ label, url, className }: WebsiteLink & { className?: string }) {
  return <a className={className} href={url}>{label} ↗</a>;
}

export function SocialLinks({ items }: { items: WebsiteLink[] }) {
  return items.map((item, index) => <ExternalLink key={index} {...item} />);
}

export function Stack({ items }: { items: string[] }) {
  return items.length ? <p className="stack">{items.join(" / ")}</p> : null;
}

export function Section({ id, number, copy, children }: {
  id: string;
  number: number;
  copy: SectionCopy;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <p className="eyebrow">{String(number).padStart(2, "0")} / {copy.label}</p>
        <h2 id={`${id}-title`}><RichText>{copy.title}</RichText></h2>
        {copy.description && <p><RichText>{copy.description}</RichText></p>}
      </div>
      {children}
    </section>
  );
}
