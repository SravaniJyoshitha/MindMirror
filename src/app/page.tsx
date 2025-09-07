
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Footprints, GitBranch } from 'lucide-react';
import { useAge } from './layout';


export default function HomePage() {
  const { isChild } = useAge();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
      <div>
        <h1 className="text-4xl font-headline mb-2">Welcome Back</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {isChild ? 'How are you feeling today?' : 'How would you like to focus on your wellness today?'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-7xl pt-8">
        <Link href="/sparks" className="flex">
          <Card className="w-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{isChild ? 'Your Sparkle Bot' : 'Your Therapist - SparkAI'}</CardTitle>
                  <CardDescription>{isChild ? 'Get help with your feelings.' : 'Get personalized cognitive exercises.'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
               <p>
                {isChild ? 'Describe a feeling and get a fun activity like a breathing game or drawing idea to help you feel better.' : 'Describe a situation to get a personalized session with a cognitive exercise, coping strategies, and more.'}
              </p>
            </CardContent>
            <div className="p-6 pt-0">
               <Button className="w-full">{isChild ? 'Let\'s Start!' : 'Begin Session'}</Button>
            </div>
          </Card>
        </Link>
        <Link href="/whispers" className="flex">
          <Card className="w-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-2xl">Whispers</CardTitle>
                    <CardDescription>{isChild ? 'Talk to helpers or friends.' : 'Community & support.'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                {isChild ? 'Find friendly grown-ups to talk to, or connect with your friends in a safe space.' : 'Find professional support from licensed therapists or connect with a community of peers who understand.'}
              </p>
            </CardContent>
             <div className="p-6 pt-0">
               <Button className="w-full">{isChild ? 'Find Support' : 'Get Connected'}</Button>
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
                    <CardTitle className="text-2xl">{isChild ? 'Your Feelings Garden' : 'Your Progress Journal'}</CardTitle>
                    <CardDescription>{isChild ? 'See how your feelings have grown!' : 'Visualize your emotional journey.'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                {isChild ? 'Look at all the feelings you\'ve shared, and the cool badges you\'ve collected.' : 'Review your reflection history, track your emotional patterns, and celebrate the milestones you\'ve achieved.'}
              </p>
            </CardContent>
             <div className="p-6 pt-0">
               <Button className="w-full">{isChild ? 'See My Garden' : 'View Journal'}</Button>
            </div>
          </Card>
        </Link>
         <Link href="/echoes" className="flex">
          <Card className="w-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-3 rounded-full">
                  <GitBranch className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-2xl">Echoes of Tomorrow</CardTitle>
                    <CardDescription>A message from your future self.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Share a current worry or aspiration and receive a supportive "memory" from a wiser, future version of yourself who has already navigated this moment.
              </p>
            </CardContent>
             <div className="p-6 pt-0">
               <Button className="w-full">Get Perspective</Button>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
