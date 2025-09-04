'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Bot, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateAvatar } from '@/app/actions';

const formSchema = z.object({
  emotionalStateDescription: z
    .string()
    .min(10, 'Please describe your feelings in at least 10 characters.'),
});

export default function AvatarPage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emotionalStateDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAvatarUrl(null);
    try {
      const result = await generateAvatar(values);
      if (result.success && result.data?.avatarDataUri) {
        setAvatarUrl(result.data.avatarDataUri);
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Something went wrong.',
          description:
            result.error || 'There was a problem with generating your avatar.',
        });
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">
            Emotion Reflector
          </CardTitle>
          <CardDescription>
            Describe your current emotional state to generate a visual
            representation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="emotionalStateDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your emotional state</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'I feel calm and peaceful, like a still lake at dawn.'"
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Reflection'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="w-full md:w-64 h-64 flex-shrink-0">
              <div className="aspect-square w-full h-full rounded-lg bg-secondary/50 flex items-center justify-center border-2 border-dashed border-primary/20">
                {isLoading ? (
                  <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                ) : avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Generated AI Avatar"
                    width={256}
                    height={256}
                    className="rounded-lg object-cover"
                    data-ai-hint="generated avatar"
                  />
                ) : (
                  <div className="text-center text-muted-foreground p-4">
                    <Bot className="h-16 w-16 mx-auto text-primary/70" />
                    <p className="text-sm mt-2">
                      Your reflection will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
