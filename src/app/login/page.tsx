
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AUTH_KEY = 'mindmirror-auth';
const USER_AGE_KEY = 'mindmirror-user-age';

export default function LoginPage() {
  const router = useRouter();
  const [age, setAge] = useState('');

  const handleLogin = () => {
    // In a real app, you'd have authentication logic here.
    try {
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(USER_AGE_KEY, age);
    } catch (error) {
      console.error('Could not set auth status in local storage', error);
    }
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
             <Sparkles className="size-8 text-primary" />
             <h1 className="text-3xl font-bold font-headline">MindMirror+</h1>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Join to begin your personalized wellness journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" type="text" placeholder="City, Country" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleLogin}>
            Sign Up
          </Button>
           <p className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline" onClick={(e) => { e.preventDefault(); handleLogin(); }}>
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
