import * as Users from './users'

export const persuasionTechniques = [
  [
    "Attractiveness",
    "Use of prominent stars, attractive people, or other intruiging factors to draw attention or manipulate.",
  ],
  [
    "Camouflaging",
    "Omitting relevant information and instead providing distracting but seemingly 'relevant' details.",
  ],
  [
    "Emotional manipulation",
    "Direct blame casting hate, personal stories to draw positive attention, or similar techniques; or trying to evoke anger, fear, or other emotions.",
  ],
  [
    "Fake Evidence",
    "Explicitly claiming that 'studies show' or prominent sources support one's argument, often in support of controversial, drastic, or exaggerated statements.",
  ],
  ["Exhortation", "Use of virtue and morals for persuation."],
  [
    "Inclusive Language",
    "Manipulates the audience to feel 'on the same page' as the author and to share their opinion.",
  ],
  [
    "Propaganda",
    "Distorted or hidden facts, only supporting one perspective, framing, etc. Propaganda is designed to be slow and subtle and thus difficult to spot.",
  ],
  [
    "Stories",
    "Often biased, unfair, subjective, and sacrificing factual accuracy by portraying a sympathetic character as victim of an 'evil' situation.",
  ],
  [
    "Suggestions",
    "Directly motivating the audience to take specific action or change their minds, or subtly displaying an opinion as a fact.",
  ],
  [
    "Wording",
    "Strongly connoted words flagging things as positive or negative.",
  ],
];

export const quotes: [string, string, number[]][] = [
  [
    "Eco-warrior Greta Thunberg given final warning to move during London protest before she was arrested for staying put.",
    "greta thunberg",
    [5, 1, 0, 9],
  ],
  [
    "It is extraordinary that the current Government only plans to raise spending on our military to 2.5 per cent of GDP and cannot say when that will happen. If war is imminent we need to spend the money now.",
    "gov spending war",
    [5, 9, 3, 6],
  ],
  [
    "It is extraordinary that the current Government only plans to raise spending on our military to 2.5 per cent of GDP and cannot say when that will happen. If war is imminent we need to spend the money now.",
    "gov spending war",
    [7, 9, 3, 6],
  ],
  [
    "The conflict in the Middle East has escalated from the Gaza Strip to neighboring countries, Russia invaded Ukraine two years ago and China has threatened to attack Taiwan. So it is understandable that people are alarmed by the news that Britain’s flagship £3.5billion aircraft carrier HMS Queen Elizabeth will not be able to join Nato’s largest military exercise in Europe since the end of the Cold War due to corrosion on a coupling on the starboard propeller shaft.",
    "conflicts, uk ship",
    [9, 3, 2, 4],
  ],
  [
    "A group of 12 former officers said: 'With Islamism and other extremism rampant, this policy is nothing short of dangerous madness'.",
    "extremism, policy",
    [8, 6, 4, 2],
  ],
  [
    "But these policies would drag Britain back to the industrial mayhem of the 1970s, kill off any chance of growth and leave the economy at the mercy of the union barons.",
    "uk industrial mayhem",
    [2, 5, 1, 3],
  ],
];

export const passwordTileCriteria: [string, string, () => number][] = [
  ["Length", "Passwords longer than 12 characters", () => Users.passwordStat.long],
  ["Lowercase Letters", "Passwords with a lowercase letter or more", () => Users.passwordStat.lower],
  ["Upper Letters", "Passwords with an uppercase letter or more", () => Users.passwordStat.upper],
  ["Numbers", "Passwords with a number or more", () => Users.passwordStat.number],
  ["Symbols", "Passwords with a symbol or more", () => Users.passwordStat.symbol],
  ["Arbitrary", "Passwords without sequences", () => Users.passwordStat.noSequence],
];
