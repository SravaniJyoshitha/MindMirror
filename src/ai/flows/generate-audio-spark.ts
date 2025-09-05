'use server';
/**
 * @fileOverview An AI flow that generates a short audio clip based on a text prompt.
 *
 * - generateAudioSpark - A function that takes a descriptive prompt and returns a playable audio clip.
 * - GenerateAudioSparkInput - The input type for the generateAudioSpark function.
 * - GenerateAudioSparkOutput - The return type for the generateAudioSpark function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

const GenerateAudioSparkInputSchema = z.object({
  prompt: z
    .string()
    .describe('A text prompt describing the desired audio, e.g., "A calming 432Hz frequency soundscape to reduce anxiety."'),
});
export type GenerateAudioSparkInput = z.infer<
  typeof GenerateAudioSparkInputSchema
>;

const GenerateAudioSparkOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe("The generated audio as a data URI in WAV format. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateAudioSparkOutput = z.infer<
  typeof GenerateAudioSparkOutputSchema
>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateAudioSparkFlow = ai.defineFlow(
  {
    name: 'generateAudioSparkFlow',
    inputSchema: GenerateAudioSparkInputSchema,
    outputSchema: GenerateAudioSparkOutputSchema,
  },
  async ({ prompt }) => {
    // This is an experimental feature and may not produce musical results.
    // The prompt guides the model to generate a soundscape.
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // A neutral voice
          },
        },
      },
      prompt: `(Soundscape) ${prompt}. Synthesize a short, calming audio experience based on this description.`,
    });

    if (!media) {
      throw new Error('No audio media was returned from the AI model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

export async function generateAudioSpark(
  input: GenerateAudioSparkInput
): Promise<GenerateAudioSparkOutput> {
  return generateAudioSparkFlow(input);
}
