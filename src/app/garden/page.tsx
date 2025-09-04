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
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface GardenItem {
  date: string;
  emotion: string;
  icon: LucideIcon;
  color: string;
}

const gardenData: GardenItem[] = [
  {
    date: 'Yesterday',
    emotion: 'Peaceful',
    icon: Sprout,
    color: 'text-chart-2',
  },
  { date: '2 days ago', emotion: 'Hopeful', icon: Leaf, color: 'text-chart-4' },
  { date: '4 days ago', emotion: 'Joyful', icon: Flower2, color: 'text-chart-5' },
  { date: 'Last week', emotion: 'Content', icon: Sprout, color: 'text-chart-2' },
  {
    date: '2 weeks ago',
    emotion: 'Grounded',
    icon: TreePine,
    color: 'text-chart-3',
  },
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
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline mb-2">Your Progress Journal</h1>
        <p className="text-muted-foreground">
          Visualize your emotional journey and celebrate your milestones.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Reflection History</CardTitle>
          <CardDescription>
            Each entry represents a moment of reflection. Review your journey
            over time.
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
                  <p className="font-semibold">{item.emotion}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Sprout className="w-12 h-12 mx-auto mb-4 text-chart-2" />
              <p className="font-semibold">
                Your journal is waiting to be filled.
              </p>
              <p className="text-sm">
                Start by creating your first reflection in the{' '}
                <Link href="/whispers" className="text-primary hover:underline">
                  Whispers
                </Link>{' '}
                page.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Achievements</CardTitle>
          <CardDescription>
            Collect badges for achieving personal milestones.
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
