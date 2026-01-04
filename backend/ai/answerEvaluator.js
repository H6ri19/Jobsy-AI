import client from './aiClient.js';

export const evaluateAnswerWithAI = async (question, answer) => {
  const prompt = `
You are a technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return ONLY JSON:
{
  "feedback": "short constructive feedback",
  "score": number between 0 and 10
}
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const text = response.choices[0].message.content;
  const match = text.match(/\{[\s\S]*\}/);
  return match ? JSON.parse(match[0]) : { feedback: 'No feedback', score: 0 };
};
