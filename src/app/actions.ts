'use server';

import {
  generateAvatar as generateAvatarFlow,
  type GenerateAvatarInput,
  type GenerateAvatarOutput,
} from '@/ai/flows/generate-avatar';

interface ActionResult {
  success: boolean;
  data?: GenerateAvatarOutput;
  error?: string;
}

export async function generateAvatar(
  input: GenerateAvatarInput
): Promise<ActionResult> {
  try {
    const result = await generateAvatarFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating avatar:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred.',
    };
  }
}
