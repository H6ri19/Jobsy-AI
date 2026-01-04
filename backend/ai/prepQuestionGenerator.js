import client from './aiClient.js';

export const generatePrepQuestions = async (resume, level) => {
  const difficultyMap = {
    easy: 'basic concepts and definitions',
    medium: 'practical usage and common interview questions',
    hard: 'project-based and real-world problem solving',
    veryhard: 'edge cases, performance, optimization, best practices',
    extreme: 'system design, scalability, architecture decisions',
  };

  const prompt = `
You are a senior technical interviewer.

Generate 5 ${level.toUpperCase()} interview questions based on the candidate's resume.

Difficulty focus:
${difficultyMap[level]}

Rules:
- Questions must be based ONLY on skills, projects, and experience from the resume
- Do NOT ask unrelated questions
- Do NOT include answers
- Return ONLY a JSON array of questions

Resume JSON:
${JSON.stringify(resume, null, 2)}
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
  });

  const text = response.choices[0].message.content;
  const match = text.match(/\[[\s\S]*\]/);
  return match ? JSON.parse(match[0]) : [];
};
