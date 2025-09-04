'use server';
/**
 * @fileOverview An AI flow that generates a cognitive reframing exercise based on a user's situation.
 *
 * - getCognitiveSpark - A function that returns a cognitive exercise for a specific situation.
 * - CognitiveSparkInput - The input type for the getCognitiveSpark function.
 * - CognitiveSparkOutput - The return type for the getCognitiveSpark function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CognitiveSparkInputSchema = z.string().describe('The situation the user is facing.');
export type CognitiveSparkInput = z.infer<typeof CognitiveSparkInputSchema>;

const CognitiveSparkOutputSchema = z.object({
  title: z
    .string()
    .describe(
      'A short, engaging title for the coping strategy (e.g., "The 5-4-3-2-1 Grounding Technique").'
    ),
  prompt: z
    .string()
    .describe(
      'A clear, step-by-step guide for a practical coping exercise. It should be easy to follow and apply in a moment of stress or overwhelm.'
    ),
  spark: z
    .string()
    .describe(
      'A concluding "spark" or insight. This is a short, memorable takeaway that explains the benefit of the exercise.'
    ),
});
export type CognitiveSparkOutput = z.infer<
  typeof CognitiveSparkOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'cognitiveSparkPrompt',
  input: { schema: CognitiveSparkInputSchema },
  output: { schema: CognitiveSparkOutputSchema },
  prompt: `You are an AI wellness coach specializing in Cognitive Behavioral Therapy (CBT) and mindfulness techniques for young adults.

Your task is to generate a single, practical coping strategy or exercise based on the user's situation. Present it as a "Cognitive Spark."

- **Title:** Create a clear title for the coping strategy or exercise.
- **Prompt:** Write a simple, step-by-step guide for the exercise. It should be a recognized technique for managing stress, anxiety, or negative thought patterns relevant to the user's situation. The tone should be instructional and supportive.
- **Spark:** Provide a short, powerful insight that explains why this exercise is helpful or what its benefits are for the described situation.

Avoid generic advice. Make the exercise practical and actionable. The goal is to provide a concrete tool the user can use immediately to manage their mental state.

User's situation:
"{{{input}}}"`,
});

const getCognitiveSparkFlow = ai.defineFlow(
  {
    name: 'getCognitiveSparkFlow',
    inputSchema: CognitiveSparkInputSchema,
    outputSchema: CognitiveSparkOutputSchema,
  },
  async (situation) => {
    const { output } = await prompt(situation);
    return output!;
  }
);

export async function getCognitiveSpark(situation: CognitiveSparkInput): Promise<CognitiveSparkOutput> {
  return getCognitiveSparkFlow(situation);
}
