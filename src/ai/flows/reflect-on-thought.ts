
'use server';
/**
 * @fileOverview An AI flow that reflects on a user's thought.
 *
 * - reflectOnThought - A function that takes a thought and returns a reflection.
 * - ReflectOnThoughtOutput - The return type for the reflectOnThought function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ReflectOnThoughtOutputSchema = z.object({
  reflection: z.string().describe('A short, supportive, and insightful reflection on the user\'s thought. Frame it as a gentle observation or a question to prompt deeper thought. Avoid giving direct advice.'),
});
export type ReflectOnThoughtOutput = z.infer<
  typeof ReflectOnThoughtOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'reflectOnThoughtPrompt',
  input: { schema: z.string() },
  output: { schema: ReflectOnThoughtOutputSchema },
  prompt: `You are an AI wellness companion. A user has shared the following thought. Your task is to provide a short, supportive, and insightful reflection on it.

The reflection should be gentle and empathetic. It should not be preachy or offer unsolicited advice. Instead, it should act as a soft mirror, helping the user see their own thought in a new light. You can frame it as a gentle observation or a thoughtful question.

The goal is to provide comfort and encourage self-reflection, not to solve their problems. Keep it concise, around 2-3 sentences.

User's thought:
"{{{input}}}"`,
});

const reflectOnThoughtFlow = ai.defineFlow(
  {
    name: 'reflectOnThoughtFlow',
    inputSchema: z.string(),
    outputSchema: ReflectOnThoughtOutputSchema,
  },
  async (thought) => {
    const { output } = await prompt(thought);
    return output!;
  }
);

export async function reflectOnThought(
  thought: string
): Promise<ReflectOnThoughtOutput> {
  return reflectOnThoughtFlow(thought);
}

    