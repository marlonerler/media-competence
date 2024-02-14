"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.move = exports.slides = exports.answers = exports.currentSlideIndex = void 0;
const Components = __importStar(require("./components"));
const CurriculumData = __importStar(require("./curriculumData"));
const Ws = __importStar(require("./websocket"));
exports.currentSlideIndex = 0;
exports.answers = {};
exports.slides = [
    () => {
        return {
            mainId: "question",
            contents: {
                "question-text": "What would you check before reading an article?",
            },
        };
    },
    () => {
        return {
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
            mainId: "tiles",
            contents: {
                "tile-headline": "Persuasion Techniques",
                "tile-text": "This is only a selection of the most relevant persuastion techniques.",
                "tile-body": Components.persuastionTiles(),
            },
        };
    },
    ...CurriculumData.quotes
        .map((x) => [
        () => {
            resetAnswers();
            return Components.quoteSlide(x[0], x[1]);
        },
        () => Components.answerStatSlide(x[0]),
    ])
        .flat(),
    () => {
        return {
            mainId: "basic-task",
            contents: {
                "task-text": "Read this article and find persuastion techniques.\nWe will compare this in class.",
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
            mainId: "question",
            contents: {
                "question-text": "Cyberattacks: How do you recognize them and what do you do?",
            },
        };
    },
    () => {
        return {
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
            mainId: "basic-content",
            contents: {
                "basic-content-headline": "Dangerous links",
                "basic-content-body": `<ul style="font-family: arial">
          <li><a onmouseover="this.innerText = this.innerText.toUpperCase()" href="http://accounts.googIe.com/something/legit/blabla">accounts.googIe.com/something/legit/blabla</a></li>
          <li><a href="http://accounts.goоgle.com/something/legit/blabla">accounts.gоogle.com/something/legit/blabla</a></li>
          <li><a href="http://nbcnews.co">accounts.google.com/something/legit/blabla</a></li>
        </ul>
        <br>
        <p>All of these links could be embedded in an e-mail unnoticeably.</p>`,
            },
        };
    },
    () => {
        return {
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
    () => {
        return {
            mainId: "summary",
            contents: {
                "email-grid": Components.emailTiles(),
                "password-grid": Components.passwordTiles(),
            },
        };
    },
    () => {
        return {
            mainId: "basic-content",
            contents: {
                "basic-content-headline": "Thank you.",
                "basic-content-body": "This application is entirely open-source.<br>You can review the code at <a href='https://github.com/marlonerler/media-competence'>https://github.com/marlonerler/media-competence</a>.",
            },
        };
    },
];
function move(offset) {
    exports.currentSlideIndex += offset;
    Ws.sockets.forEach((ws) => ws.send(fetch()));
}
exports.move = move;
function fetch() {
    const currentSlideFunction = exports.slides[exports.currentSlideIndex];
    if (!currentSlideFunction)
        return '';
    const currentSlide = currentSlideFunction();
    const stringified = JSON.stringify(currentSlide);
    return `slide
  ${stringified}`;
}
exports.fetch = fetch;
function resetAnswers() {
    exports.answers = {};
}
