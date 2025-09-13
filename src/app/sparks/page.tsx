
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
import {
  Loader2,
  Zap,
  Lightbulb,
  ShieldQuestion,
  CheckCircle,
  MessageSquare,
  Music,
  Smile,
} from 'lucide-react';
import {
  getCognitiveSpark,
  type CognitiveSparkOutput,
} from '@/ai/flows/get-cognitive-spark';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAge } from '../layout';
import { EmojiBar } from '@/components/ui/emoji-bar';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { GeminiLogo } from '@/components/ui/gemini-logo';

const soundMap: Record<string, string> = {
  '432Hz Healing Frequency':
    'https://open.spotify.com/playlist/37i9dQZF1DX2v5qUXRSK2p',
  'Binaural Beats for Focus':
    'https://open.spotify.com/playlist/37i9dQZF1DWZel4j3y8f3g',
  '528Hz Solfeggio Frequency':
    'https://open.spotify.com/album/1oRucM5CL0c5j1s2tC1eI4',
  'Deep Sleep Delta Waves':
    'https://open.spotify.com/playlist/37i9dQZF1DWYcDQ1hSjOpY',
  'Theta Waves for Meditation':
    'https://open.spotify.com/album/1qMOoiQ3Ul0H5tOLOUXR7d',
};

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    fill="currentColor"
    {...props}
  >
    <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.1 2.9-8.9 2.3-12.3-1.6-32.3-22.3-71.3-36.4-114.2-36.4-40.4 0-77.2 13.1-107.5 34.5-3.8 2.6-8.7 2.2-12-1.2-3.3-3.4-3.7-8.4-1.1-12.2 35.3-51.1 94.1-81.5 159.7-81.5 69.9 0 132.2 33.1 176.9 88.5 2.7 3.4 2.3 8.3-1.2 11.6zM248 152c-65.7 0-120.5 45.4-120.5 101.5 0 23.4 9.9 45.1 26.5 61.8-3.9 2.5-8.1 3.9-12.5 3.9-6.3 0-12.4-1.6-17.9-4.5-3.1-1.7-6.8-1.5-9.6 0.5-2.8 2-4.2 5.2-3.7 8.5 6.6 43.5 45.3 76.7 91.1 76.7 47.7 0 87-35.3 92-81.4 0.5-3.6-1.1-7.1-4.1-9-2.9-1.9-6.6-1.7-9.4 0.4-5.6 2.9-11.8 4.5-18.2 4.5-4.6 0-9-1.5-13-4.2 16.9-16.7 27-38.6 27-62.2 0-56.1-54.8-101.5-120.5-101.5zm62.4 163.4c-3.2 2.1-7.1 1.9-9.9-0.4-25.1-19.9-57.9-31.4-93-31.4-32.9 0-63.4 10.6-88.2 28.5-2.9 2.1-6.7 1.9-9.5-0.5-2.7-2.4-3.6-6.1-2-9.2 31.2-57.7 87.9-92.2 150.3-92.2 60.1 0 114.2 32.2 150.8 82.5 2.2 3 1.9 7-0.7 9.5-2.5 2.5-6.3 2.9-9.4 0.8z" />
  </svg>
);

export default function SparksPage() {
  const [spark, setSpark] = useState<CognitiveSparkOutput | null>(null);
  const [currentSituation, setCurrentSituation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isChild } = useAge();

  const audioSrc = spark?.musicSuggestion?.title
    ? soundMap[spark.musicSuggestion.title]
    : undefined;

  const handleGenerateSpark = async (situation: string) => {
    if (!situation.trim()) {
      toast({
        variant: 'destructive',
        title: isChild ? 'Whoops!' : 'Please describe your situation.',
        description: isChild
          ? "I need to know how you're feeling to help!"
          : "We need to know what you're going through to help.",
      });
      return;
    }

    setIsLoading(true);
    setSpark(null);

    try {
      const newSpark = await getCognitiveSpark({ situation });
      setSpark(newSpark);
    } catch (error) {
      console.error('Error generating cognitive spark:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem generating your spark. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setCurrentSituation((prev) => prev + emoji);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateSpark(currentSituation);
  };

  const handleNewSpark = () => {
    setSpark(null);
    setCurrentSituation('');
  };

  const showInputArea = !spark && !isLoading;
  const showLoading = isLoading;
  const showResults = spark && !isLoading;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div>
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-3xl font-headline">
            {isChild ? 'Sparkle Bot' : 'SparkAI Therapist'}
          </h1>
          {!isChild && <GeminiLogo className="size-8 text-primary" />}
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          {isChild
            ? "Tell me about a feeling, and I'll give you a fun activity to feel better."
            : 'Describe a situation and get a tailored cognitive exercise from Gemini.'}
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <Card className="p-4 sm:p-8">
          {showInputArea && (
            <>
              <CardHeader>
                <CardTitle>
                  {isChild ? 'How are you feeling?' : "What's on your mind?"}
                </CardTitle>
                <CardDescription>
                  {isChild
                    ? "You can tell me anything. I'm here to listen."
                    : "Briefly describe the situation you're facing."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="grid w-full gap-4">
                  <div className="grid w-full gap-2 text-left">
                     <Label htmlFor="situation" className="flex items-center gap-2">
                       <MessageSquare className="size-4" />
                       My situation is...
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="situation"
                        placeholder={
                          isChild
                            ? "e.g., I'm feeling sad because my friend was mean..."
                            : "e.g., I'm feeling anxious about a big presentation..."
                        }
                        value={currentSituation}
                        onChange={(e) => setCurrentSituation(e.target.value)}
                        rows={4}
                        className="resize-none pr-10"
                      />
                      <div className="absolute top-3 right-3">
                        <Smile className="size-5 text-muted-foreground/50" />
                      </div>
                    </div>
                  </div>
                  <EmojiBar onEmojiSelect={handleEmojiSelect} />
                  <Button size="lg" type="submit" className="w-full">
                    <Zap className="mr-2" />
                    {isChild ? 'Help Me Sparkle!' : 'Generate Spark'}
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
                  {isChild
                    ? 'Thinking of a fun idea for you...'
                    : 'Generating your cognitive spark...'}
                </p>
              </div>
            </CardContent>
          )}

          {showResults && spark && (
            <>
              <CardContent className="p-6 space-y-6 text-left animate-in fade-in duration-500">
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                  <p className="font-semibold text-primary text-center flex-1">
                    {spark.reassurance}
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Zap className="text-primary" />
                    {isChild ? 'Activity Time!' : 'Cognitive Exercise'}:{' '}
                    {spark.title}
                  </CardTitle>
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {spark.exercise}
                  </p>
                </div>

                {spark.musicSuggestion && audioSrc && (
                  <Card className="p-4 bg-secondary">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Music className="text-secondary-foreground/80" />
                      {isChild
                        ? 'Happy Sounds'
                        : 'Audio Spark for Instant Relief'}
                    </h3>
                    <p className="font-bold text-secondary-foreground">
                      {spark.musicSuggestion.title}
                    </p>
                    <p className="text-sm text-secondary-foreground mb-4">
                      {spark.musicSuggestion.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-secondary-foreground">
                        Listen on:
                      </span>
                      <Link
                        href={audioSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-background hover:bg-accent"
                        >
                          <SpotifyIcon className="w-5 h-5" />
                          <span className="sr-only">Spotify</span>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )}

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Lightbulb className="text-accent-foreground/80" />
                    {isChild ? 'Things to Remember' : 'Key Realizations'}
                  </h3>
                  <ul className="space-y-2 list-inside">
                    {spark.realizations.map((realization, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-chart-2 mt-1 shrink-0" />
                        <span>{realization}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <ShieldQuestion className="text-secondary-foreground/80" />
                    {isChild ? 'A Quick Tip' : 'Instant Coping Strategy'}
                  </h3>
                  <p className="font-bold text-secondary-foreground">
                    {spark.instantCopingStrategy.title}
                  </p>
                  <p className="text-sm text-secondary-foreground">
                    {spark.instantCopingStrategy.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleNewSpark}>
                  {isChild ? 'Ask Again!' : 'Start a New Session'}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
