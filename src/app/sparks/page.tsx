'use client';

import { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import {
  getCognitiveSpark,
  type CognitiveSparkOutput,
} from '@/ai/flows/get-cognitive-spark';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const soundMap: Record<string, string> = {
  'Calming Rain': 'https://storage.googleapis.com/studiopa-prod-request-tool-images/assets/rain.mp3',
  'Gentle Ocean Waves': 'https://storage.googleapis.com/studiopa-prod-request-tool-images/assets/ocean.mp3',
  'Forest Ambience': 'https://storage.googleapis.com/studiopa-prod-request-tool-images/assets/forest.mp3',
  'Crackling Fireplace': 'https://storage.googleapis.com/studiopa-prod-request-tool-images/assets/fire.mp3',
  'Peaceful Night': 'https://storage.googleapis.com/studiopa-prod-request-tool-images/assets/night.mp3',
};


export default function SparksPage() {
  const [spark, setSpark] = useState<CognitiveSparkOutput | null>(null);
  const [currentSituation, setCurrentSituation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSrc = spark?.musicSuggestion?.title ? soundMap[spark.musicSuggestion.title] : undefined;

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        // Autoplay was prevented, which is common in browsers.
        // The user can still press play manually.
        console.info('Audio autoplay was prevented by the browser.');
      });
    }
  }, [audioSrc]);

  const handleGenerateSpark = async (situation: string) => {
    if (!situation.trim()) {
      toast({
        variant: 'destructive',
        title: 'Please describe your situation.',
        description: "We need to know what you're going through to help.",
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateSpark(currentSituation);
  };

  const handleNewSpark = () => {
    setSpark(null);
    setCurrentSituation('');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const showInputArea = !spark && !isLoading;
  const showLoading = isLoading;
  const showResults = spark && !isLoading;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div>
        <h1 className="text-3xl font-headline mb-2">SparkAI Therapist</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Describe a situation or a feeling, and get a tailored cognitive
          exercise to help you find a new perspective.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <Card className="p-4 sm:p-8">
          {showInputArea && (
            <>
              <CardHeader>
                <CardTitle>What's on your mind?</CardTitle>
                <CardDescription>
                  Briefly describe the situation you're facing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="grid w-full gap-2">
                  <Textarea
                    id="situation"
                    placeholder="e.g., I'm feeling anxious about a big presentation..."
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <Button size="lg" type="submit" className="w-full">
                    <MessageSquare className="mr-2" />
                    Generate Spark
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
                  Generating your cognitive spark...
                </p>
              </div>
            </CardContent>
          )}

          {showResults && spark && (
            <>
              <CardContent className="p-6 space-y-6 text-left animate-in fade-in duration-500">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="font-semibold text-primary text-center">
                    {spark.reassurance}
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Zap className="text-primary" />
                    Cognitive Exercise: {spark.title}
                  </CardTitle>
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {spark.exercise}
                  </p>
                </div>

                {spark.musicSuggestion && (
                  <>
                    <Separator />
                    <div className="p-4 bg-secondary rounded-lg">
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Music className="text-secondary-foreground/80" />
                        Audio Spark for Instant Relief
                      </h3>
                      <p className="font-bold text-secondary-foreground">
                        {spark.musicSuggestion.title}
                      </p>
                      <p className="text-sm text-secondary-foreground mb-4">
                        {spark.musicSuggestion.description}
                      </p>
                      {audioSrc ? (
                         <audio ref={audioRef} controls className="w-full">
                           <source src={audioSrc} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <p>Could not find a matching sound for the suggestion.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Lightbulb className="text-accent-foreground/80" />
                    Key Realizations
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
                    Instant Coping Strategy
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
                  Start a New Session
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
