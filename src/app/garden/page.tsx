
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
  Bot,
  Loader2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAge } from '../layout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  reflectOnThought,
  type ReflectOnThoughtOutput,
} from '@/ai/flows/reflect-on-thought';
import { useToast } from '@/hooks/use-toast';

interface GardenItem {
  thought: string;
  date: string;
  icon: LucideIcon;
  color: string;
}

const iconOptions: { icon: LucideIcon; color: string }[] = [
  { icon: Sprout, color: 'text-chart-2' },
  { icon: Leaf, color: 'text-chart-4' },
  { icon: Flower2, color: 'text-chart-5' },
  { icon: TreePine, color: 'text-chart-3' },
  { icon: Feather, color: 'text-chart-1' },
  { icon: Sun, color: 'text-chart-4' },
  { icon: Moon, color: 'text-chart-3' },
  { icon: Wind, color: 'text-chart-2' },
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
  const [gardenData, setGardenData] = useState<GardenItem[]>([]);
  const { isChild } = useAge();
  const { toast } = useToast();
  const [selectedThought, setSelectedThought] = useState<GardenItem | null>(
    null
  );
  const [reflection, setReflection] = useState<ReflectOnThoughtOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const storedReflections = localStorage.getItem('reflections');
      if (storedReflections) {
        const parsedReflections: { thought: string; date: string }[] =
          JSON.parse(storedReflections);
        const gardenItems = parsedReflections.map((item, index) => {
          const iconInfo = iconOptions[index % iconOptions.length];
          return {
            ...item,
            ...iconInfo,
          };
        });
        setGardenData(gardenItems.reverse()); // Show most recent first
      }
    } catch (error) {
      console.error('Failed to parse reflections from localStorage', error);
      setGardenData([]);
    }
  }, []);

  const handleOpenReflection = async (item: GardenItem) => {
    setSelectedThought(item);
    setIsLoading(true);
    setReflection(null);
    try {
      const result = await reflectOnThought(item.thought);
      setReflection(result);
    } catch (error) {
      console.error('Error getting reflection', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem getting your reflection. Please try again.',
      });
      setSelectedThought(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                : 'Each entry represents a moment of reflection. Click one to get an AI-powered insight.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {gardenData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {gardenData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleOpenReflection(item)}
                    className="flex flex-col items-center p-4 border rounded-lg bg-background hover:bg-accent/50 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm"
                  >
                    <item.icon
                      className={`w-16 h-16 ${item.color} mb-2 transition-transform duration-500`}
                    />
                    <p
                      className="font-semibold text-center truncate w-full"
                      title={item.thought}
                    >
                      &quot;{item.thought}&quot;
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Sprout className="w-12 h-12 mx-auto mb-4 text-chart-2" />
                <p className="font-semibold">
                  {isChild
                    ? 'Your garden is empty!'
                    : 'Your journal is waiting to be filled.'}
                </p>
                <p className="text-sm">
                  {isChild
                    ? 'Go to '
                    : 'Start by creating your first reflection in the '}
                  <Link
                    href="/whispers"
                    className="text-primary hover:underline"
                  >
                    {isChild ? 'Whispers' : 'Whispers'}
                  </Link>
                  {isChild ? ' to plant your first feeling!' : ' page.'}
                </p>
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

      <Dialog
        open={!!selectedThought}
        onOpenChange={(isOpen) => !isOpen && setSelectedThought(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reflection</DialogTitle>
          </DialogHeader>
          {selectedThought && (
            <div className="space-y-4">
              <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
                <p>&quot;{selectedThought.thought}&quot;</p>
                <footer className="text-xs mt-2">
                  You on {selectedThought.date}
                </footer>
              </blockquote>
              <div className="p-4 bg-primary/10 rounded-lg text-primary-foreground">
                <div className="flex items-start gap-3">
                  <Bot className="text-primary size-6 flex-shrink-0 mt-1" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">AI Insight</h3>
                    {isLoading ? (
                      <div className="flex items-center gap-2 mt-2">
                        <Loader2 className="size-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Generating insight...
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground mt-1">
                        {reflection?.reflection}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
