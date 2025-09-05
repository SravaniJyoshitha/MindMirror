import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Footprints } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div>
        <h1 className="text-4xl font-headline mb-2">Welcome Back</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          How would you like to focus on your wellness today?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl pt-8">
        <Link href="/sparks" className="flex">
          <Card className="w-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Your Therapist - SparkAI</CardTitle>
                  <CardDescription>Get personalized cognitive exercises.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Describe what's on your mind and receive tailored coping strategies and exercises to reframe your thoughts.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
               <Button className="w-full">Begin Session</Button>
            </div>
          </Card>
        </Link>
        <Link href="/garden" className="flex">
          <Card className="w-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-3 rounded-full">
                  <Footprints className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-2xl">Your Progress Journal</CardTitle>
                    <CardDescription>Visualize your emotional journey.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Review your reflection history, track your emotional patterns, and celebrate the milestones you've achieved.
              </p>
            </CardContent>
             <div className="p-6 pt-0">
               <Button className="w-full">View Journal</Button>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
