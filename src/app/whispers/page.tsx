
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WhisperForm } from '@/components/WhisperForm';
import { useAge } from '../layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageSquarePlus,
  UserPlus,
  Users,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const whispers = [
  "I'm feeling overwhelmed with work, but I'm afraid to tell anyone.",
  "Sometimes I feel incredibly lonely, even when I'm surrounded by people.",
  'I achieved a small goal today and I am secretly very proud of myself.',
  "I miss someone I can't talk to anymore, and it hurts.",
  'It feels like everyone else has their life figured out except for me.',
  'I am grateful for the sunshine today. It made me smile.',
  'Struggling with motivation lately. It is hard to get started on anything.',
  'I wish I could go back in time for just one day.',
];

const friends = [
  {
    name: 'Alex',
    avatar: '/avatars/01.png',
    status: 'online',
  },
  {
    name: 'Jordan',
    avatar: '/avatars/02.png',
    status: 'online',
  },
  {
    name: 'Taylor',
    avatar: '/avatars/03.png',
    status: 'offline',
  },
  {
    name: 'Casey',
    avatar: '/avatars/04.png',
    status: 'online',
  },
];

export default function WhispersPage() {
  const { isChild } = useAge();

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-headline mb-2">
            {isChild ? 'Share a Feeling' : 'Anonymous Thought Stream'}
          </h1>
          <p className="text-muted-foreground">
            {isChild
              ? "Share a secret feeling. No one will know it's you!"
              : 'A place to share your thoughts and feelings without judgment. You are not alone.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Users className="size-5" />
            <span className="sr-only">Community</span>
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquarePlus className="size-5" />
             <span className="sr-only">Private Chats</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader>
              <CardTitle>
                {isChild ? 'What Are You Feeling?' : 'Share a Thought'}
              </CardTitle>
              <CardDescription>
                {isChild
                  ? "It's okay to share what you're feeling. Our friendly helper will write back to you."
                  : 'Your thoughts are safe here. Share anonymously and receive a supportive reflection from our AI companion.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhisperForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="stream">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stream">
                {isChild ? 'Feelings from Others' : 'Community Stream'}
              </TabsTrigger>
              <TabsTrigger value="friends">{isChild ? 'My Friends' : 'Friends'}</TabsTrigger>
            </TabsList>
            <TabsContent value="stream" className="mt-4">
              <div className="space-y-4">
                {whispers.map((whisper, index) => (
                  <Card key={index} className="bg-card/80">
                    <CardContent className="p-4">
                      <p className="italic text-card-foreground">
                        “{whisper}”
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="friends" className="mt-4">
               <Card>
                <CardHeader>
                  <CardTitle>{isChild ? 'Connect with Friends' : 'Connect with Others'}</CardTitle>
                  <CardDescription>{isChild ? 'You can add friends and chat with them!' : 'Find and connect with others in the community.'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {friends.map((friend) => (
                    <div key={friend.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50">
                      <div className="flex items-center gap-4">
                        <Avatar>
                           <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                           <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-background`} />
                        </Avatar>
                        <p className="font-semibold">{friend.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <UserPlus className="mr-2" />
                          {isChild ? 'Add' : 'Add Friend'}
                        </Button>
                         <Button variant="secondary" size="sm">
                          <MessageSquarePlus className="mr-2" />
                           {isChild ? 'Chat' : 'Chat'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
