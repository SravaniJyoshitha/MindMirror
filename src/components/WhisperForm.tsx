'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Smile } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { reflectOnThought } from '@/ai/flows/reflect-on-thought';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { useAge } from '@/app/layout';

const formSchema = z.object({
  whisper: z
    .string()
    .min(5, 'Your thought must be at least 5 characters long.')
    .max(280, 'Your thought cannot be more than 280 characters.'),
});

const saveReflection = (thought: string) => {
  try {
    const existingReflections = localStorage.getItem('reflections');
    const reflections = existingReflections ? JSON.parse(existingReflections) : [];
    
    const newReflection = {
      thought,
      date: format(new Date(), "MMM d, yyyy"),
    };
    
    reflections.push(newReflection);
    localStorage.setItem('reflections', JSON.stringify(reflections));

  } catch (error) {
    console.error("Could not save reflection to local storage", error);
  }
};


export function WhisperForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reflection, setReflection] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { isChild } = useAge();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whisper: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await reflectOnThought(values.whisper);
      setReflection(response.reflection);
      setIsDialogOpen(true);
      
      saveReflection(values.whisper);

      form.reset();
      toast({
        title: 'Thought Shared',
        description: 'Thank you for sharing. Your reflection has been added to your journal.',
      });
    } catch (error) {
      console.error('Error reflecting on thought:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with our AI. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="whisper"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                     <Textarea
                        placeholder="Share what's on your mind..."
                        className="resize-none pr-10"
                        rows={4}
                        {...field}
                      />
                      <div className="absolute top-3 right-3">
                         <Smile className="size-5 text-muted-foreground/50" />
                      </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sharing...
              </>
            ) : (
              isChild ? 'Share Secretly' : 'Share Anonymously'
            )}
          </Button>
        </form>
      </Form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                <span>A Moment of Reflection</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            {reflection ? (
              <p>{reflection}</p>
            ) : (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
