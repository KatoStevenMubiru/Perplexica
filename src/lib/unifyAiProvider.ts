import OpenAI from 'openai';
import { getUnifyApiKey, getUnifyApiEndpoint } from '../config';

const openai = new OpenAI({
  apiKey: getUnifyApiKey(),
  baseURL: getUnifyApiEndpoint(),
});

export async function getChatCompletion(messages: OpenAI.Chat.ChatCompletionMessageParam[]) {
  const response = await openai.chat.completions.create({
    model: "llama-3-8b-chat@fireworks-ai",
    messages: messages,
  });
  return response.choices[0].message.content;
}