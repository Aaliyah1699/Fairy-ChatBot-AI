import OpenAI from 'openai';

export const configureOpenAI = () => {
  const config = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
    organization: process.env.OPEN_AI_ORG,
  });
  return config;
};
