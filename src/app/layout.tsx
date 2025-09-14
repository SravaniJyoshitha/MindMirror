
'use client';
import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/AppLayout';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from './login/page';

const metadata: Metadata = {
  title: 'MindMirror+',
  description: 'The AI Wellness Companion',
};

const AUTH_KEY = 'mindmirror-auth';
const USER_AGE_KEY = 'mindmirror-user-age';

interface AgeContextType {
  isChild: boolean;
}

const AgeContext = createContext<AgeContextType>({ isChild: false });

export const useAge = () => useContext(AgeContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [theme, setTheme] = useState('');
  const [isChild, setIsChild] = useState(false);

  useEffect(() => {
    let isAuthenticated = false;
    try {
      isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
      const ageStr = localStorage.getItem(USER_AGE_KEY);
      if (ageStr) {
        const age = parseInt(ageStr, 10);
        const child = age <= 12;
        setIsChild(child);
        setTheme(child ? 'theme-child' : '');
      } else {
        setIsChild(false);
        setTheme('');
      }
    } catch (error) {
       // If localStorage is not available, default theme and proceed without auth for SSR/testing
       setIsChild(false);
       setTheme('');
    }

    if (!isAuthenticated) {
      router.push('/login');
    } else {
       setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking) {
    // Render nothing or a loading spinner to avoid content flash and wait for client-side check
    return null;
  }

  // Apply theme via a wrapper div on the client side
  return (
    <AgeContext.Provider value={{ isChild }}>
      <div className={theme}>
        <AppLayout>{children}</AppLayout>
      </div>
    </AgeContext.Provider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {isLoginPage ? <LoginPage /> : <AuthProvider>{children}</AuthProvider>}
        <Toaster />
      </body>
    </html>
  );
}
