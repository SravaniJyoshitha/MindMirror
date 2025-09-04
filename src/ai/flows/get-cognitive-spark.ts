'use server';
/**
 * @fileOverview An AI flow that generates a cognitive reframing exercise.
 *
 * - getCognitiveSpark - A function that returns a cognitive exercise.
 * - CognitiveSparkOutput - The return type for the getCognitiveSpark function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CognitiveSparkOutputSchema = z.object({
  title: z.string().describe('A short, engaging title for the cognitive exercise (e.g., "The Observer\'s View").'),
  prompt: z.string().describe('A clear, concise prompt that guides the user through a thought experiment or reframing exercise. It should encourage them to look at a situation from a different angle.'),
  spark: z.string().describe('A concluding "spark" or insight. This is a short, memorable takeaway that summarizes the lesson of the exercise.'),
});
export type CognitiveSparkOutput = z.infer<
  typeof CognitiveSparkOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'cognitiveSparkPrompt',
  output: { schema: CognitiveSparkOutputSchema },
  prompt: `You are an AI wellness coach specializing in Cognitive Behavioral Therapy (CBT) and mindfulness techniques for young adults.

Your task is to generate a single, unique cognitive reframing exercise. The exercise should be presented as a short, engaging "Cognitive Spark."

- **Title:** Create a catchy title for the exercise.
- **Prompt:** Write a simple, direct prompt that guides the user through a thought experiment. It should help them challenge a common negative thought pattern (like catastrophizing, black-and-white thinking, or personalization) without being preachy. The tone should be curious and exploratory.
- **Spark:** Provide a short, powerful insight or takeaway that the user can easily remember.

Avoid generic advice. Make the exercise practical and actionable. The goal is to provide a small, concrete tool for thought that the user can apply to their life.`,
});

const getCognitiveSparkFlow = ai.defineFlow(
  {
    name: 'getCognitiveSparkFlow',
    outputSchema: CognitiveSparkOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);

export async function getCognitiveSpark(): Promise<CognitiveSparkOutput> {
  return getCognitiveSparkFlow();
}
