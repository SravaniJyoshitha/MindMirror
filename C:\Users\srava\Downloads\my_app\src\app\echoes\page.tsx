
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
import { Loader2, GitBranch, MessageSquare, Pen, Target, Home } from 'lucide-react';
import {
  getFutureSelfEcho,
  type FutureSelfEchoOutput,
} from '@/ai/flows/get-future-self-echo';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useAge } from '../layout';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function EchoesPage() {
  const [echo, setEcho] = useState<FutureSelfEchoOutput | null>(null);
  const [currentSituation, setCurrentSituation] = useState('');
  const [futureGoal, setFutureGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isChild } = useAge();

  const handleGenerateEcho = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSituation.trim()) {
      toast({
        variant: 'destructive',
        title: 'Please describe your current situation.',
        description:
          "We need to know what's on your mind to get a message from your future self.",
      });
      return;
    }

    setIsLoading(true);
    setEcho(null);

    try {
      const newEcho = await getFutureSelfEcho({
        situation: currentSituation,
        goal: futureGoal,
      });
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
    setFutureGoal('');
  };

  const showInputArea = !echo && !isLoading;
  const showLoading = isLoading;
  const showResults = echo && !isLoading;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div className="w-full max-w-2xl flex justify-between items-start">
        <div className="text-left">
          <h1 className="text-3xl font-headline mb-2">Echoes of Tomorrow</h1>
          <p className="text-muted-foreground max-w-2xl">
            Share a current worry and a future dream, and receive a letter back
            from the version of you who has already achieved it.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">
            <Home className="mr-2" /> Home
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-2xl">
        <Card className="p-4 sm:p-8">
          {showInputArea && (
            <>
              <CardHeader>
                <CardTitle>A Message to the Future</CardTitle>
                <CardDescription>
                  Your future self is listening. What do you want them to know?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerateEcho} className="grid w-full gap-6">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="goal" className="text-left flex items-center gap-2">
                       <Target className="size-4" />
                       My future goal or dream is... (optional)
                    </Label>
                    <Textarea
                      id="goal"
                      placeholder="e.g., to become a doctor, to travel the world, or to feel truly happy."
                      value={futureGoal}
                      onChange={(e) => setFutureGoal(e.target.value)}
                      rows={2}
                      className="resize-none"
                    />
                  </div>
                  <div className="grid w-full gap-2">
                     <Label htmlFor="situation" className="text-left flex items-center gap-2">
                       <MessageSquare className="size-4" />
                       What&apos;s on your mind today?
                    </Label>
                    <Textarea
                      id="situation"
                      placeholder="e.g., I'm feeling anxious about the future, or I hope I can achieve my goal of..."
                      value={currentSituation}
                      onChange={(e) => setCurrentSituation(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
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
