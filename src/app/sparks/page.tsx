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
import { Loader2, Zap, Bot, Lightbulb, ShieldQuestion, CheckCircle } from 'lucide-react';
import {
  getCognitiveSpark,
  type CognitiveSparkOutput,
} from '@/ai/flows/get-cognitive-spark';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SparksPage() {
  const [spark, setSpark] = useState<CognitiveSparkOutput | null>(null);
  const [situation, setSituation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSpark = async () => {
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
      const newSpark = await getCognitiveSpark(situation);
      setSpark(newSpark);
    } catch (error) {
      console.error('Error getting cognitive spark:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem generating a spark. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSpark = () => {
    setSpark(null);
    setSituation('');
  };

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
        {!spark && !isLoading && (
          <Card className="p-8">
            <CardHeader>
              <CardTitle>What&apos;s on your mind?</CardTitle>
              <CardDescription>
                Briefly describe the situation you&apos;re facing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="situation" className="sr-only">
                  Your Situation
                </Label>
                <Textarea
                  id="situation"
                  placeholder="e.g., I'm feeling anxious about a big presentation..."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button size="lg" onClick={handleGetSpark} className="w-full">
                <Bot className="mr-2" />
                Generate Spark
              </Button>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <Card className="flex flex-col items-center justify-center min-h-[20rem] p-8">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground">Generating your Spark...</p>
          </Card>
        )}

        {spark && !isLoading && (
          <Card className="text-left animate-in fade-in duration-500">
            <CardContent className="p-6 space-y-6">
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
                <p className="whitespace-pre-wrap text-muted-foreground">{spark.exercise}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Lightbulb className="text-accent-foreground/80"/>
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
                <p className="font-bold text-secondary-foreground">{spark.instantCopingStrategy.title}</p>
                <p className="text-sm text-secondary-foreground">{spark.instantCopingStrategy.description}</p>
              </div>

            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNewSpark}>
                Generate Another Spark
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
