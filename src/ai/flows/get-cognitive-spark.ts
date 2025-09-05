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

const CognitiveSparkInputSchema = z
  .string()
  .describe('The situation the user is facing.');
export type CognitiveSparkInput = z.infer<typeof CognitiveSparkInputSchema>;

const CognitiveSparkOutputSchema = z.object({
  title: z
    .string()
    .describe(
      'A short, engaging title for the main coping strategy (e.g., "The 5-4-3-2-1 Grounding Technique").'
    ),
  reassurance: z
    .string()
    .describe(
      'A short, empathetic, and validating message that acknowledges the user\'s feelings (e.g., "It\'s completely understandable to feel anxious about exams.").'
    ),
  exercise: z
    .string()
    .describe(
      'A clear, step-by-step guide for a practical coping exercise. It should be easy to follow and apply.'
    ),
  realizations: z
    .array(z.string())
    .describe(
      'A few bullet points or short sentences that offer perspective or normalize the user\'s experience, helping them understand their feelings.'
    ),
  alternative: z
    .object({
      title: z.string().describe('The title of the alternative strategy.'),
      description: z
        .string()
        .describe(
          'A brief description of a different coping strategy if the first one doesn\'t help.'
        ),
    })
    .describe('An alternative coping strategy.'),
});
export type CognitiveSparkOutput = z.infer<typeof CognitiveSparkOutputSchema>;

const prompt = ai.definePrompt({
  name: 'cognitiveSparkPrompt',
  input: { schema: CognitiveSparkInputSchema },
  output: { schema: CognitiveSparkOutputSchema },
  prompt: `You are an AI wellness coach specializing in Cognitive Behavioral Therapy (CBT) and mindfulness techniques for young adults.

Your task is to generate a supportive and practical response based on the user's situation.

User's situation:
"{{{input}}}"

Based on this situation, generate the following:

1.  **Reassurance:** Start with a short, empathetic, and validating message that acknowledges their feelings. Make them feel heard and understood.
2.  **Title:** Create a clear title for a primary, practical coping strategy or exercise.
3.  **Exercise:** Write a simple, step-by-step guide for the exercise. It should be a recognized technique for managing stress, anxiety, or negative thought patterns relevant to the user's situation.
4.  **Realizations:** Provide 2-3 short, insightful bullet points that help normalize the user's experience or offer a new perspective. These should be gentle "aha" moments.
5.  **Alternative:** Suggest one alternative coping strategy with a title and a brief description, in case the first one isn't a good fit for the user at that moment.`,
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

export async function getCognitiveSpark(
  situation: CognitiveSparkInput
): Promise<CognitiveSparkOutput> {
  return getCognitiveSparkFlow(situation);
}
