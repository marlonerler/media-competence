import * as Curriculum from "./curriculum";
import * as CurriculumData from "./curriculumData";
import * as Users from "./users";

export function persuasionTile(title: string, body: string): string {
  return `<div class="tile">
        <h2>${title}</h2>
        <p>${body}</p>
    </div>`;
}

export function persuastionTiles(): string {
  return CurriculumData.persuasionTechniques
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((x) => persuasionTile(x[0], x[1]))
    .join("\n");
}

export function quoteSlide(
  quote: string,
  description: string,
  options: number[]
): Curriculum.Slide {
  return {
    mainId: "quotes",
    description,
    contents: {
      "quote-body": quote,
      "quote-task": "Select all persuasion techniques you find in this quote.",
      "quote-solution-grid": options.map((i) => quotePTOption(i)).join("\n"),
    },
  };
}

export function quotePTOption(index: number): string {
  const data = CurriculumData.persuasionTechniques[index];
  return `<div class="tile clickable">
    <h2>${data[0]}</h2>
    <p>${data[1]}</p>
  </div>`;
}

export function emailTile(email: string): string {
  return `<div class="tile">
    <p class="code-01">${email}</p>
  </div>`;
}

export function emailTiles(): string {
  return Users.emails.map((x) => emailTile(x)).join("\n");
}

export function passwordTile(
  title: string,
  text: string,
  absolute: number
): string {
  const total = Users.passwordStat.total;

  return `<div class="tile">
    <h2>${title}</h2>
    <p>${text}</p>
    <p class="secondary">${absolute} of ${total} passwords</p>
    <div class="meter-track">
      <div class="meter-bar" style="width: ${
        (absolute / Users.passwordStat.total) * 100
      }%"></div>
    </div>
  </div>`;
}

export function passwordTiles(): string {
  return CurriculumData.passwordTileCriteria
    .map((x) => passwordTile(x[0], x[1], x[2]()))
    .join("\n");
}
