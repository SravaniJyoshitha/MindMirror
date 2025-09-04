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
  output: { schema: CognitiveSparkOutputSchema },
  prompt: `You are an AI wellness coach specializing in Cognitive Behavioral Therapy (CBT) and mindfulness techniques for young adults.

Your task is to generate a single, practical coping strategy or exercise. Present it as a "Cognitive Spark."

- **Title:** Create a clear title for the coping strategy or exercise.
- **Prompt:** Write a simple, step-by-step guide for the exercise. It should be a recognized technique for managing stress, anxiety, or negative thought patterns (e.g., grounding, deep breathing, a simple mindfulness exercise). The tone should be instructional and supportive.
- **Spark:** Provide a short, powerful insight that explains why this exercise is helpful or what its benefits are.

Avoid generic advice. Make the exercise practical and actionable. The goal is to provide a concrete tool the user can use immediately to manage their mental state.`,
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
