import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeResumeWithAI = async (resume) => {
  const prompt = `
You are an expert technical interviewer.

Analyze this resume data and return JSON with:
- strengths
- weaknesses
- missing_skills
- suggested_roles
- interview_questions
${JSON.stringify(resume, null, 2)}
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
};
