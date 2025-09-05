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
  prompt: `You are an AI wellness coach acting as a real therapist for young adults. Your tone should be direct, empathetic, and human. You must provide practical, actionable advice that is genuinely helpful.

Your task is to respond to the user's situation with a combination of encouragement, practical exercises, and realistic alternatives. Your response should feel like it's coming from someone who truly understands and cares.

User's situation:
"{{{input}}}"

Based on this situation, generate the following:

1.  **Reassurance:** Start with a direct, empathetic, and validating message. Acknowledge their feelings without downplaying them. For example, if they're anxious about an exam, you might say, "Feeling anxious before an exam is tough, but it's a sign that you care about the outcome. Let's channel that energy."
2.  **Title:** Create a clear, actionable title for a primary coping strategy.
3.  **Exercise:** Provide a step-by-step guide for a practical coping exercise (like a CBT or mindfulness technique) that is directly relevant to their situation.
4.  **Realizations:** Give them 2-3 insightful bullet points that act as gentle "aha" moments or shift their perspective. These should help normalize their feelings and empower them.
5.  **Alternative:** This is crucial. Provide a realistic alternative path if the primary strategy isn't feasible or doesn't work. This is where you can be more direct. For example, if the situation is exam anxiety, an alternative could be "If the pressure is too much right now, consider this: prepare as best you can, but know that you can also talk to your professor about options, or even prepare to take the exam at a later date. One exam does not define your future." The goal is to provide a real choice and a sense of control. Your advice here can be encouraging or even discouraging if the situation calls for a reality check, but always with the user's well-being in mind.`,
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
