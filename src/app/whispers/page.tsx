
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAge } from '../layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Info,
  MessageSquarePlus,
  UserPlus,
  Users,
  Video,
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

const therapists = [
  {
    name: 'Dr. Evelyn Reed',
    avatar: 'https://i.pravatar.cc/150?img=1',
    specialty: 'Anxiety & Stress Management',
    bio: 'With over 10 years of experience, Dr. Reed specializes in cognitive-behavioral therapy (CBT) to help you develop coping strategies.',
  },
  {
    name: 'Dr. Marcus Thorne',
    avatar: 'https://i.pravatar.cc/150?img=2',
    specialty: 'Depression & Relationship Issues',
    bio: 'Dr. Thorne offers a compassionate, person-centered approach to help you navigate life\'s challenges and build stronger connections.',
  },
    {
    name: 'Dr. Lena Petrova',
    avatar: 'https://i.pravatar.cc/150?img=3',
    specialty: 'Trauma & PTSD',
    bio: 'Dr. Petrova uses evidence-based techniques like EMDR to help clients process trauma in a safe and supportive environment.',
  },
];

export default function WhispersPage() {
  const { isChild } = useAge();

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-headline mb-2">
            {isChild ? 'Helpers & Friends' : 'Community & Support'}
          </h1>
          <p className="text-muted-foreground">
            {isChild
              ? "Talk to a grown-up helper or connect with friends."
              : 'Find professional therapists or connect with peers.'}
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
      
      <Tabs defaultValue="therapists" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="therapists">{isChild ? 'Find a Helper' : 'Connect with a Therapist'}</TabsTrigger>
          <TabsTrigger value="friends">{isChild ? 'Friends & Community' : 'Connect with Friends'}</TabsTrigger>
        </TabsList>
        <TabsContent value="therapists" className="mt-4">
           <Card>
            <CardHeader>
              <CardTitle>
                {isChild ? 'Available Helpers' : 'Available Therapists'}
              </CardTitle>
              <CardDescription>
                {isChild
                  ? "Here are some friendly people you can talk to."
                  : 'Browse profiles and find the right therapist for you.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {therapists.map((therapist) => (
                 <Card key={therapist.name} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                     <Avatar className="h-16 w-16 border">
                       <AvatarImage src={therapist.avatar} alt={therapist.name} />
                       <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                       <p className="font-bold">{therapist.name}</p>
                       <p className="text-xs font-medium text-primary">{therapist.specialty}</p>
                       <p className="text-sm text-muted-foreground mt-2">{therapist.bio}</p>
                       <div className="flex gap-2 mt-3">
                         <Button size="sm" variant="secondary">
                           <MessageSquarePlus className="mr-2" />
                           {isChild ? 'Chat' : 'Message'}
                         </Button>
                         <Button size="sm">
                           <Video className="mr-2" />
                           {isChild ? 'Call' : 'Book Session'}
                         </Button>
                       </div>
                    </div>
                  </div>
                 </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="friends" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2">
              <Tabs defaultValue="friends">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="friends">{isChild ? 'My Friends' : 'Friends List'}</TabsTrigger>
                  <TabsTrigger value="stream">
                    {isChild ? 'Feelings from Others' : 'Community Stream'}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="friends" className="mt-4">
                   <Card>
                    <CardHeader>
                      <CardTitle>{isChild ? 'Your Friends' : 'Your Friends'}</CardTitle>
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
                <TabsContent value="stream" className="mt-4">
                  <div className="space-y-4">
                    <Card className="bg-primary/10 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                           <Info className="size-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-primary">You are not alone.</p>
                            <p className="text-sm text-primary/80">This is an anonymous stream of thoughts from other users. It's a reminder that many people share similar feelings, and you're part of a community that understands.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

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
              </Tabs>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Be Kind & Respectful:</strong> Treat everyone with kindness. No bullying or mean comments.</p>
                  <p><strong>Share with Care:</strong> Be mindful of what you share. Avoid posting personal information.</p>
                  <p><strong>Support Each Other:</strong> Offer encouragement and support to fellow community members.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
