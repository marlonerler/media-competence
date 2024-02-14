import * as Components from "./components";
import * as CurriculumData from "./curriculumData";
import * as Ws from "./websocket";

export let currentSlideIndex: number = 0;

export interface Slide {
  description: string;
  mainId: string;
  contents: { [key: string]: string };
}

export const slides: (() => Slide)[] = [
  () => {
    return {
      description: "summary",
      mainId: "summary",
      contents: {
        "email-grid": Components.emailTiles(),
        "password-grid": Components.passwordTiles(),
      },
    };
  },
  () => {
    return {
      description: "What to check in general (question to students)",
      mainId: "question",
      contents: {
        "question-text": "What would you check before reading an article?",
      },
    };
  },
  () => {
    return {
      description: "What to check in general (solutions on publisher)",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Checking Sources: Fundamentals",
        "basic-content-body": `<ul>
        <li>Publisher</li>
        <ul>
            <li>Well-known source or small blog?</li>
            <li>Credible appearance?</li>
        </ul>
        <li>URL</li>
        <ul>
            <li>Ending in .co? (e.g. nbcnews.co instead of nbcnews.com)</li>
            <li>Seeming fake? "Typo"? (e.g. tageschau.de)</li>
        </ul>
      </ul>`,
      },
    };
  },
  () => {
    return {
      description: "What to check in general (solutions on content)",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Checking Sources: Fundamentals",
        "basic-content-body": `<ul>
        <li>Date of Publication</li>
        <ul>
            <li>No date provided?</li>
            <li>Out of date?</li>
        </ul>
        <li>Motive of text</li>
        <ul>
            <li>Objective reporting?</li>
            <li>Manipulation, persuation, etc?</li>
        </ul>
        <li>Red flags</li>
        <ul>
            <li>Bias, only one perspective, etc.</li>
            <li>Framing, persuasion techniques</li>
        </ul>
      </ul>`,
      },
    };
  },
  () => {
    return {
      description: "What to check in general (checking)",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Checking Sources: Fundamentals",
        "basic-content-body": `<ul>
            <li>Cross-check</li>
            <ul>
            <li>Research using different sites</li>
            <li>Consider well-known sources like BBC, NBC, CNN, etc.</li>
            </ul>
            <li>Research the author</li>
            <ul>
                <li>Presence on social media: harassing, inciting conflict, etc?</li>
                <li>History? CV, education, career, ...</li>
            </ul>
            <li>Research the platform</li>
            <ul>
                <li>"About us" page</li>
                <li>Look for reviews on other sites</li>
            </ul>
          </ul>`,
      },
    };
  },
  () => {
    return {
      description: "What to check in general (solutions on publisher)",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Checking Sources: Fundamentals",
        "basic-content-body": `<ul>
        <li>Publisher</li>
        <ul>
            <li>Well-known source or small blog?</li>
            <li>Credible appearance?</li>
        </ul>
        <li>URL</li>
        <ul>
            <li>Ending in .co? (e.g. nbcnews.co instead of nbcnews.com)</li>
            <li>Seeming fake? "Typo"? (e.g. tageschau.de)</li>
        </ul>
      </ul>`,
      },
    };
  },
  () => {
    return {
      description: "Persuasion Techniques",
      mainId: "tiles",
      contents: {
        "tile-headline": "Persuasion Techniques",
        "tile-text":
          "This is only a selection of the most relevant persuastion techniques,",
        "tile-body": Components.persuastionTiles(),
      },
    };
  },
  ...CurriculumData.quotes.map(
    (x) => () => Components.quoteSlide(x[0], x[1], x[2])
  ),
  () => {
    return {
      description: "Full article",
      mainId: "basic-task",
      contents: {
        "task-text":
          "Read this article and find persuastion techniques.\nWe will compare this in class.",
        "task-div": `<a href='https://www.thesun.co.uk/news/25894748/housing-crisis-spiralling-migration-matt-goodwin/'>https://www.thesun.co.uk/news/25894748/housing-crisis-spiralling-migration-matt-goodwin/</a>
      <hr>
      <h2>Persuastion Techniques:</h2>
      <div class="grid pt">
      ${Components.persuastionTiles()}
      </div>`,
      },
    };
  },
  () => {
    return {
      description: "cyberattack question",
      mainId: "question",
      contents: {
        "question-text":
          "Cyberattacks: How do you recognize them and what do you do?",
      },
    };
  },
  () => {
    return {
      description: "cyberattack solution",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Identifying Cyberattacks",
        "basic-content-body": `<ul>
        <li>Techniques</li>
        <ul>
            <li>Financial, legal, personal pressure</li>
            <li>You allegedly commited a crime, your bank account was hacked, etc.</li>
            <li>The suspect claims to need help urgently</li>
        </ul>
        <li>Phishing</li>
        <ul>
            <li>"Someone accessed your account"-emails are realistic</li>
            <li>Links and sender address can be faked</li>
        </ul>
      </ul>`,
      },
    };
  },
  () => {
    return {
      description: "link example",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Dangerous links",
        "basic-content-body": `<ul style="font-family: arial">
          <li><a onmouseover="this.innerText = this.innerText.toUpperCase()" href="accounts.googIe.com/something/legit/blabla">accounts.googIe.com/something/legit/blabla</a></li>
          <li><a href="accounts.goоgle.com/something/legit/blabla">accounts.gоogle.com/something/legit/blabla</a></li>
          <li><a href="http://nbcnews.co">accounts.google.com/something/legit/blabla</a></li>
        </ul>
        <br>
        <p>All of these links could be embedded in an e-mail unnoticeably.</p>`,
      },
    };
  },
  () => {
    return {
      description: "cyberattack solution",
      mainId: "basic-content",
      contents: {
        "basic-content-headline": "Preventing Cyberattacks",
        "basic-content-body": `<ul>
        <li>Double-check address bar</li>
        <li>Re-type hostname</li>
        <li>Caution when sharing data</li>
        <li>Always use different passwords</li>
      </ul>`,
      },
    };
  },
];

export function move(offset: number): void {
  currentSlideIndex += offset;
  Ws.sockets.forEach((ws) => ws.send(fetch()));
}

export function fetch(): string {
  const currentSlide: Slide = slides[currentSlideIndex]();
  const stringified: string = JSON.stringify(currentSlide);

  

  return `slide
  ${"nextDescription"}
  ${"prevDescription"}
  ${stringified}`;
}
