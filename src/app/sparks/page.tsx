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
import { Loader2, Zap, Bot, Lightbulb, ShieldQuestion, CheckCircle, User, MessageSquare } from 'lucide-react';
import {
  getCognitiveSpark,
  type CognitiveSparkOutput,
  analyzeSituation,
  type AnalyzeSituationOutput,
} from '@/ai/flows/get-cognitive-spark';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function SparksPage() {
  const [spark, setSpark] = useState<CognitiveSparkOutput | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [currentSituation, setCurrentSituation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsFollowUp, setNeedsFollowUp] = useState(false);
  const { toast } = useToast();

  const handleInitialSubmit = async (situation: string) => {
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
    setConversation([{ role: 'user', content: situation }]);
    setCurrentSituation('');

    try {
      const analysis: AnalyzeSituationOutput = await analyzeSituation({ situation });
      if (analysis.type === 'question') {
        setConversation((prev) => [...prev, { role: 'assistant', content: analysis.question }]);
        setNeedsFollowUp(true);
      } else {
        const newSpark = await getCognitiveSpark({ situation });
        setSpark(newSpark);
      }
    } catch (error) {
      console.error('Error during initial analysis:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem analyzing your situation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFollowUpSubmit = async (followUp: string) => {
    if (!followUp.trim()) {
      toast({
        variant: 'destructive',
        title: 'Please provide some more details.',
      });
      return;
    }

    setIsLoading(true);
    const initialSituation = conversation.find(msg => msg.role === 'user')?.content || '';
    const fullContext = `${initialSituation}\n\nWhen asked for more details, I added: ${followUp}`;
    
    setConversation(prev => [...prev, {role: 'user', content: followUp}]);
    setCurrentSituation('');

    try {
      const newSpark = await getCognitiveSpark({ situation: fullContext });
      setSpark(newSpark);
      setNeedsFollowUp(false);
    } catch (error) {
      console.error('Error getting cognitive spark after follow-up:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem generating a spark. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (needsFollowUp) {
      handleFollowUpSubmit(currentSituation);
    } else {
      handleInitialSubmit(currentSituation);
    }
  };

  const handleNewSpark = () => {
    setSpark(null);
    setConversation([]);
    setCurrentSituation('');
    setNeedsFollowUp(false);
  };

  const showInputArea = !spark && !isLoading;
  const showLoading = isLoading && !spark;
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
          {(showInputArea || showLoading) && conversation.length > 0 && (
             <CardContent className="space-y-4">
               <div className="text-left space-y-4">
                 {conversation.map((msg, index) => (
                   <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                     {msg.role === 'assistant' && <div className="p-2 bg-primary/10 rounded-full"><Bot className="size-5 text-primary" /></div>}
                     <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'assistant' ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
                       <p>{msg.content}</p>
                     </div>
                      {msg.role === 'user' && <div className="p-2 bg-muted rounded-full"><User className="size-5 text-muted-foreground" /></div>}
                   </div>
                 ))}
               </div>
             </CardContent>
          )}

          {showInputArea && (
            <>
              <CardHeader>
                <CardTitle>{needsFollowUp ? "Tell me more" : "What's on your mind?"}</CardTitle>
                <CardDescription>
                  {needsFollowUp
                    ? 'Your response will help me understand better.'
                    : "Briefly describe the situation you're facing."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="grid w-full gap-2">
                  <Textarea
                    id="situation"
                    placeholder={needsFollowUp ? "You can tell me here..." : "e.g., I'm feeling anxious about a big presentation..."}
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <Button size="lg" type="submit" className="w-full">
                    <MessageSquare className="mr-2" />
                    {needsFollowUp ? 'Send' : 'Generate Spark'}
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
                  {conversation.length > 1 ? 'Thinking...' : 'Analyzing your situation...'}
                </p>
              </div>
            </CardContent>
          )}

          {showResults && (
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
