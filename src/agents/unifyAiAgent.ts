import { getChatCompletion } from '../lib/unifyAiProvider';
import OpenAI from 'openai';

export async function handleUnifyAiRequest(content: string) {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [{ role: 'user', content: content }];
    const response = await getChatCompletion(messages);
    return response;
}