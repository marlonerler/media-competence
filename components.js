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
exports.answerStatTile = exports.answerStatTiles = exports.answerStatSlide = exports.passwordTiles = exports.passwordTile = exports.emailTiles = exports.emailTile = exports.quotePTOption = exports.quoteSlide = exports.persuastionTiles = exports.persuasionTile = void 0;
const Curriculum = __importStar(require("./curriculum"));
const CurriculumData = __importStar(require("./curriculumData"));
const Users = __importStar(require("./users"));
const Utility = __importStar(require("./utility"));
function persuasionTile(title, body) {
    return `<div class="tile">
        <h2>${title}</h2>
        <p>${body}</p>
    </div>`;
}
exports.persuasionTile = persuasionTile;
function persuastionTiles() {
    return CurriculumData.persuasionTechniques
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((x) => persuasionTile(x[0], x[1]))
        .join("\n");
}
exports.persuastionTiles = persuastionTiles;
function quoteSlide(quote, options) {
    return {
        mainId: "quotes",
        contents: {
            "quote-body": quote,
            "quote-task": "Select all persuasion techniques you find in this quote.",
            "quote-solution-grid": options.map((i) => quotePTOption(i)).join("\n"),
        },
    };
}
exports.quoteSlide = quoteSlide;
function quotePTOption(index) {
    const data = CurriculumData.persuasionTechniques[index];
    return `<div class="tile clickable" onclick="selectTile(this, '${CurriculumData.persuasionTechniques[index][0]}')">
    <h2>${data[0]}</h2>
    <p>${data[1]}</p>
  </div>`;
}
exports.quotePTOption = quotePTOption;
function emailTile(email) {
    return `<div class="tile">
    <p class="code-01">${email}</p>
  </div>`;
}
exports.emailTile = emailTile;
function emailTiles() {
    return Users.emails.map((x) => emailTile(x)).join("\n");
}
exports.emailTiles = emailTiles;
function passwordTile(title, text, absolute) {
    const total = Users.passwordStat.total;
    return `<div class="tile">
    <h2>${title}</h2>
    <p>${text}</p>
    <p class="secondary">${absolute} of ${total} passwords</p>
    <div class="meter-track">
      <div class="meter-bar" style="width: ${(absolute / Users.passwordStat.total) * 100}%"></div>
    </div>
  </div>`;
}
exports.passwordTile = passwordTile;
function passwordTiles() {
    return CurriculumData.passwordTileCriteria
        .map((x) => passwordTile(x[0], x[1], x[2]()))
        .join("\n");
}
exports.passwordTiles = passwordTiles;
function answerStatSlide(question) {
    return {
        mainId: "answer-statistics",
        contents: {
            "answer-statistics-title": question,
            "answer-statistics-grid": answerStatTiles(),
        },
    };
}
exports.answerStatSlide = answerStatSlide;
function answerStatTiles() {
    return Object.keys(Curriculum.answers)
        .sort((a, b) => Curriculum.answers[b].size - Curriculum.answers[a].size)
        .map((x) => answerStatTile(x))
        .join("\n");
}
exports.answerStatTiles = answerStatTiles;
function answerStatTile(key) {
    const names = [...Curriculum.answers[key].values()];
    const summary = Utility.summarizeArray(names);
    return `<div class="tile">
    <h2>${key}</h2>
    <p class="secondary">${summary}</p>
  </div>`;
}
exports.answerStatTile = answerStatTile;
