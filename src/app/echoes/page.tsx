
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, GitBranch, MessageSquare, Pen } from 'lucide-react';
import {
  getFutureSelfEcho,
  type FutureSelfEchoOutput,
} from '@/ai/flows/get-future-self-echo';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useAge } from '../layout';

export default function EchoesPage() {
  const [echo, setEcho] = useState<FutureSelfEchoOutput | null>(null);
  const [currentSituation, setCurrentSituation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isChild } = useAge();

  const handleGenerateEcho = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSituation.trim()) {
      toast({
        variant: 'destructive',
        title: 'Please describe your situation.',
        description:
          "We need to know what you're going through to get a message from your future self.",
      });
      return;
    }

    setIsLoading(true);
    setEcho(null);

    try {
      const newEcho = await getFutureSelfEcho({ situation: currentSituation });
      setEcho(newEcho);
    } catch (error) {
      console.error('Error generating future self echo:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem generating your echo. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEcho = () => {
    setEcho(null);
    setCurrentSituation('');
  };

  const showInputArea = !echo && !isLoading;
  const showLoading = isLoading;
  const showResults = echo && !isLoading;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div>
        <h1 className="text-3xl font-headline mb-2">Echoes of Tomorrow</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Write a message to your future self about a current worry or hope, and
          receive a letter back from them.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <Card className="p-4 sm:p-8">
          {showInputArea && (
            <>
              <CardHeader>
                <CardTitle>What&apos;s on your mind today?</CardTitle>
                <CardDescription>
                  Share a current struggle, hope, or feeling. Your future self
                  is listening.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerateEcho} className="grid w-full gap-4">
                  <Textarea
                    id="situation"
                    placeholder="e.g., I'm feeling anxious about the future, or I hope I can achieve my goal of..."
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                  <Button size="lg" type="submit">
                    <Pen className="mr-2" />
                    Send to the Future
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {showLoading && (
            <CardContent>
              <div className="flex flex-col items-center justify-center min-h-[10rem] p-8">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">
                  Receiving your echo from tomorrow...
                </p>
              </div>
            </CardContent>
          )}

          {showResults && echo && (
            <>
              <CardContent className="p-6 space-y-6 text-left animate-in fade-in duration-500">
                <div className="border border-border rounded-lg p-6 bg-background">
                  <CardTitle className="flex items-center gap-3 mb-4 text-primary">
                    <GitBranch />
                    {echo.title}
                  </CardTitle>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {echo.echo}
                    </p>
                  </blockquote>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleNewEcho}>
                  Write Another Message
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
