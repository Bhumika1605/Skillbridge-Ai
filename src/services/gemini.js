export async function evaluateInterview(questions, answers) {

  let totalScore = 0;

  let strengths = [];
  let weaknesses = [];
  let suggestions = [];

  answers.forEach((answer, index) => {

    let score = 40;

    const words = answer.trim().split(/\s+/).length;

    // Answer Length
    if (words >= 40) score += 20;
    else if (words >= 20) score += 10;
    else score -= 10;

    // Confidence Words
    const confidenceWords = [
      "I",
      "experience",
      "developed",
      "implemented",
      "created",
      "built",
      "worked",
      "designed",
      "improved",
      "managed"
    ];

    confidenceWords.forEach(word => {
      if (answer.toLowerCase().includes(word.toLowerCase()))
        score += 2;
    });

    // Technical Words
    const technicalWords = [
      "react",
      "javascript",
      "html",
      "css",
      "api",
      "database",
      "node",
      "mongodb",
      "python",
      "sql",
      "algorithm",
      "array",
      "function"
    ];

    technicalWords.forEach(word => {
      if (answer.toLowerCase().includes(word))
        score += 3;
    });

    score = Math.min(100, score);

    totalScore += score;

    if (score >= 85)
      strengths.push(`Excellent answer for Question ${index + 1}`);

    else if (score >= 70)
      strengths.push(`Good explanation in Question ${index + 1}`);

    else {
      weaknesses.push(`Question ${index + 1} needs more explanation.`);
      suggestions.push(`Improve answer ${index + 1} with examples.`);
    }

  });

  const overall = Math.round(totalScore / questions.length);

  return {

    overall,

    confidence: Math.max(60, overall - 3),

    communication: Math.max(60, overall + 2),

    technical: Math.max(60, overall - 5),

    problemSolving: Math.max(60, overall - 4),

    grammar: Math.max(65, overall + 3),

    strengths:
      strengths.length
        ? strengths
        : [
            "Good confidence",
            "Clear communication",
            "Positive attitude"
          ],

    weaknesses:
      weaknesses.length
        ? weaknesses
        : [
            "Need more practical examples"
          ],

    suggestions: [
      ...suggestions,
      "Practice mock interviews.",
      "Improve technical depth.",
      "Explain projects using STAR method.",
      "Maintain eye contact while speaking.",
      "Keep answers concise and structured."
    ].slice(0,5)

  };

}