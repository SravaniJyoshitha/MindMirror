
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sprout,
  Leaf,
  Flower2,
  Award,
  Trophy,
  Star,
  HeartHandshake,
  TreePine,
  Feather,
  Sun,
  Moon,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAge } from '../layout';

interface GardenItem {
  name: string;
  date: string;
  icon: LucideIcon;
  color: string;
}

const gardenData: GardenItem[] = [
  { name: 'First Reflection', date: 'May 1', icon: Sprout, color: 'text-chart-2' },
  { name: 'Positive Outlook', date: 'May 3', icon: Leaf, color: 'text-chart-4' },
  { name: 'Big Achievement', date: 'May 5', icon: Flower2, color: 'text-chart-5' },
  { name: 'Growth Mindset', date: 'May 8', icon: TreePine, color: 'text-chart-3' },
  { name: 'New Perspective', date: 'May 10', icon: Feather, color: 'text-chart-1' },
  { name: 'Morning Gratitude', date: 'May 12', icon: Sun, color: 'text-chart-4' },
  { name: 'Evening Thoughts', date: 'May 14', icon: Moon, color: 'text-chart-3' },
  { name: 'Inner Peace', date: 'May 15', icon: Wind, color: 'text-chart-2' },
];

interface BadgeItem {
  name: string;
  description: string;
  icon: LucideIcon;
}

const badgeData: BadgeItem[] = [
  {
    name: 'First Reflection',
    description: 'Completed your first reflection.',
    icon: Award,
  },
  {
    name: 'Weekly Check-in',
    description: 'Used the app every day for a week.',
    icon: Trophy,
  },
  {
    name: 'Community Contributor',
    description: 'Shared your first thought.',
    icon: HeartHandshake,
  },
  {
    name: 'Positive Streak',
    description: 'Logged a positive emotion for 3 days.',
    icon: Star,
  },
];

export default function GardenPage() {
  const { isChild } = useAge();
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline mb-2">
          {isChild ? 'Your Feelings Garden' : 'Your Progress Journal'}
        </h1>
        <p className="text-muted-foreground">
          {isChild
            ? "See all the feelings you've planted and watch them grow!"
            : 'Visualize your emotional journey and celebrate your milestones.'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isChild ? 'My Feelings History' : 'My Reflection History'}
          </CardTitle>
          <CardDescription>
            {isChild
              ? "Each flower is a feeling you shared. It's fun to look back!"
              : 'Each entry represents a moment of reflection.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gardenData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {gardenData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 border rounded-lg bg-background hover:bg-accent/50 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm"
                >
                  <item.icon
                    className={`w-16 h-16 ${item.color} mb-2 transition-transform duration-500`}
                  />
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12 text-muted-foreground">
              <Sprout className="w-12 h-12 mx-auto mb-4 text-chart-2" />
              <p className="font-semibold">{isChild ? 'Your garden is empty!' : 'Your journal is waiting to be filled.'}</p>
              <p className="text-sm">{isChild ? 'Go to ' : 'Start by creating your first reflection in the '}<Link href="/whispers" className="text-primary hover:underline">{isChild ? 'Whispers' : 'Whispers'}</Link>{isChild ? ' to plant your first feeling!' : ' page.'}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {isChild ? 'My Awesome Badges' : 'My Achievements'}
          </CardTitle>
          <CardDescription>
            {isChild
              ? 'Collect cool badges for being amazing!'
              : 'Collect badges for achieving personal milestones.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badgeData.map((badge, index) => (
              <Card
                key={index}
                className="p-4 flex flex-col items-center text-center hover:bg-accent/50 transition-colors"
              >
                <div className="p-4 bg-accent rounded-full mb-3">
                  <badge.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <p className="font-bold mb-1">{badge.name}</p>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
