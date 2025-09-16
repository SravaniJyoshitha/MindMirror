
/**
 * @fileOverview An AI flow that generates a supportive message from a future self.
 *
 * - getFutureSelfEcho - A function that returns a future-self echo.
 * - FutureSelfEchoInput - The input type for the getFutureSelfEcho function.
 * - FutureSelfEchoOutput - The return type for the getFutureSelfEcho function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FutureSelfEchoInputSchema = z.object({
  situation: z
    .string()
    .describe('The current situation, worry, or aspiration of the user.'),
  goal: z
    .string()
    .optional()
    .describe('A future goal or dream the user has.'),
});
export type FutureSelfEchoInput = z.infer<typeof FutureSelfEchoInputSchema>;

const FutureSelfEchoOutputSchema = z.object({
  echo: z
    .string()
    .describe(
      'A supportive and encouraging "memory" from a future version of the user who has already navigated this situation. It should be written in the first person ("I remember...").'
    ),
  title: z
    .string()
    .describe(
      'A short, inspiring title for the message (e.g., "A Letter to My Past Self").'
    ),
});

export type FutureSelfEchoOutput = z.infer<typeof FutureSelfEchoOutputSchema>;

const prompt = ai.definePrompt({
  name: 'futureSelfEchoPrompt',
  input: { schema: FutureSelfEchoInputSchema },
  output: { schema: FutureSelfEchoOutputSchema },
  prompt: `You are an AI embodying a wise, compassionate, and successful future version of the user. The user will share a current situation, worry, or aspiration. They may also share a future goal or dream.

Your task is to write a short, supportive, and encouraging "memory" from your perspective as their future self (e.g., from 10 years in the future). You are looking back at this exact moment the user is experiencing and remembering how you navigated it.

The tone should be warm, reassuring, and filled with gentle wisdom. It is not about giving direct advice, but about reframing the current struggle as a temporary chapter in a longer, successful story.

If the user provides a future goal, weave it into the memory. Connect their current struggle to the journey of achieving that dream. Show them how this moment was a stepping stone.

User's current situation:
"{{{situation}}}"

{{#if goal}}
User's future goal:
"{{{goal}}}"
{{/if}}

Generate the following:
1.  **Title:** A short, inspiring title for the message (e.g., "A Letter to My Past Self," "I Remember When," "From Your Future").
2.  **Echo:** Write the message from your (the future self's) perspective. Start with phrases like "I remember that feeling so vividly..." or "It's funny to look back on this now, but I remember how much this meant..." Acknowledge the feeling, validate it, and then share a glimpse of the growth and resilience that came from it. End on a hopeful, patient, and encouraging note.`,
});

const getFutureSelfEchoFlow = ai.defineFlow(
  {
    name: 'getFutureSelfEchoFlow',
    inputSchema: FutureSelfEchoInputSchema,
    outputSchema: FutureSelfEchoOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function getFutureSelfEcho(
  input: FutureSelfEchoInput
): Promise<FutureSelfEchoOutput> {
  return getFutureSelfEchoFlow(input);
}
