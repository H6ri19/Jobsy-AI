import client from './aiClient.js';

export const analyzeResumeATS = async (resume) => {
  const prompt = `
You are an ATS (Applicant Tracking System) expert.

Return ONLY valid JSON.
DO NOT use markdown.
DO NOT wrap the response in \`\`\`.

JSON format:
{
  "atsScore": number,
  "atsIssues": [],
  "missingSections": [],
  "improvementSuggestions": [],
  "keywordSuggestions": []
}

Resume Data:
${JSON.stringify(resume, null, 2)}
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  });

  let text = response.choices[0].message.content;

  // 🔥 STRIP MARKDOWN IF PRESENT (CRITICAL FIX)
  text = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  // 🔒 SAFE JSON PARSE
  let atsResult;
  try {
    atsResult = JSON.parse(text);
  } catch (err) {
    console.error('ATS AI RAW RESPONSE:', text);
    throw new Error('AI returned invalid JSON');
  }

  return atsResult;
};
