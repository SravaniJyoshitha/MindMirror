// This file uses server-only features.
'use server';

/**
 * @fileOverview Generates an AI avatar based on the user's input about their current emotional state.
 *
 * - generateAvatar - A function that handles the avatar generation process.
 * - GenerateAvatarInput - The input type for the generateAvatar function.
 * - GenerateAvatarOutput - The return type for the generateAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAvatarInputSchema = z.object({
  emotionalStateDescription: z
    .string()
    .describe("A description of the user's current emotional state."),
});
export type GenerateAvatarInput = z.infer<typeof GenerateAvatarInputSchema>;

const GenerateAvatarOutputSchema = z.object({
  avatarDataUri: z
    .string()
    .describe("The generated AI avatar as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(input: GenerateAvatarInput): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAvatarPrompt',
  input: {schema: GenerateAvatarInputSchema},
  output: {schema: GenerateAvatarOutputSchema},
  prompt: `Based on the following description of the user's emotional state, generate an AI avatar that visually represents these feelings. The avatar should be a square image.

Emotional State Description: {{{emotionalStateDescription}}}

Please respond with a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.`, // Corrected format string
});

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: GenerateAvatarInputSchema,
    outputSchema: GenerateAvatarOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.emotionalStateDescription,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate avatar: No image data returned.');
    }

    return {avatarDataUri: media.url};
  }
);
