export function analyzeAnswer(answer) {
  const text = answer.toLowerCase();

  const techWords = [
    "react",
    "javascript",
    "html",
    "css",
    "node",
    "mongodb",
    "api",
    "git",
    "github",
    "tailwind",
    "firebase",
    "python",
    "java",
    "c++",
  ];

  const actionWords = [
    "developed",
    "built",
    "created",
    "implemented",
    "designed",
    "optimized",
    "improved",
    "managed",
    "led",
    "solved",
  ];

  const exampleWords = [
    "example",
    "project",
    "internship",
    "experience",
    "client",
    "college",
  ];

  const techCount = techWords.filter((w) => text.includes(w)).length;
  const actionCount = actionWords.filter((w) => text.includes(w)).length;
  const exampleCount = exampleWords.filter((w) => text.includes(w)).length;

  const words = answer.trim().split(/\s+/).filter(Boolean).length;

  let score = 40;

  score += Math.min(25, words / 2);
  score += techCount * 4;
  score += actionCount * 3;
  score += exampleCount * 3;

  if (score > 98) score = 98;

  return {
    score: Math.round(score),
    techCount,
    actionCount,
    exampleCount,
    words,
  };
}