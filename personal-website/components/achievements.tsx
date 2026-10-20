import { resume, sectionNumber } from "@/data/resume";
import { ExternalLink, Section } from "./shared";

export function Achievements() {
  const { achievements } = resume;
  return (
    <Section id="achievements" number={sectionNumber("achievements")} copy={achievements}>
      {achievements.ratings.length > 0 && (
        <>
          <div className="ratings">
            {achievements.ratings.map((rating, index) => (
              <a href={rating.url} key={index}>
                <span className="eyebrow">{rating.platform}</span><strong>{rating.rating}</strong><span>{rating.rank}</span>
              </a>
            ))}
          </div>
          <p className="small-note">{achievements.ratingsNote}</p>
        </>
      )}
      {achievements.contests.length > 0 && (
        <ul className="contests">
          {achievements.contests.map((contest, index) => (
            <li key={index}>
              <strong>{contest.place}</strong>
              <div>
                {contest.url ? <ExternalLink label={contest.name} url={contest.url} /> : <span className="contest-name">{contest.name}</span>}
                <span>{contest.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {achievements.links.map((item, index) => <ExternalLink key={index} {...item} className="text-link" />)}
    </Section>
  );
}
