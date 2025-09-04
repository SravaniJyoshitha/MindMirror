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
import { Loader2, Zap } from 'lucide-react';
import {
  getCognitiveSpark,
  type CognitiveSparkOutput,
} from '@/ai/flows/get-cognitive-spark';
import { useToast } from '@/hooks/use-toast';

export default function SparksPage() {
  const [spark, setSpark] = useState<CognitiveSparkOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSpark = async () => {
    setIsLoading(true);
    setSpark(null);
    try {
      const newSpark = await getCognitiveSpark();
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

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div>
        <h1 className="text-3xl font-headline mb-2">Cognitive Sparks</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Challenge your thought patterns and discover new perspectives with a
          quick cognitive exercise. Press the button to generate your spark.
        </p>
      </div>

      <div className="w-full max-w-md">
        {!spark && !isLoading && (
          <Card className="flex flex-col items-center justify-center min-h-[20rem] p-8">
            <Zap className="w-16 h-16 text-primary mb-4" />
            <Button size="lg" onClick={handleGetSpark}>
              Generate a New Spark
            </Button>
          </Card>
        )}

        {isLoading && (
          <Card className="flex flex-col items-center justify-center min-h-[20rem] p-8">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground">Generating...</p>
          </Card>
        )}

        {spark && !isLoading && (
          <Card className="text-left animate-in fade-in duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-primary" />
                {spark.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{spark.prompt}</p>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold italic text-primary-foreground bg-primary p-3 rounded-r-lg">
                  <span className="font-bold">Spark:</span> {spark.spark}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleGetSpark}>
                Generate Another Spark
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
