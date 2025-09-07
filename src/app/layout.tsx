
'use client';
import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/AppLayout';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const metadata: Metadata = {
  title: 'MindMirror+',
  description: 'The AI Wellness Companion',
};

function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </>
  );
}

const AUTH_KEY = 'mindmirror-auth';
const USER_AGE_KEY = 'mindmirror-user-age';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    try {
      // Auth check
      const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
      if (!isAuthenticated && pathname !== '/login') {
        router.push('/login');
        return; // Early return to prevent further state updates until redirect happens
      }

      // Theme check
      const ageStr = localStorage.getItem(USER_AGE_KEY);
      if (ageStr) {
        const age = parseInt(ageStr, 10);
        setTheme(age <= 12 ? 'theme-child' : '');
      } else {
        setTheme('');
      }

    } catch (error) {
       // If localStorage is not available, default theme and proceed without auth for SSR/testing
       setTheme('');
    } finally {
      setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking && pathname !== '/login') {
    // Render nothing or a loading spinner to avoid content flash
    return null;
  }

  // Apply theme via a wrapper div on the client side
  return <div className={theme}>{children}</div>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
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
      <body className="font-body antialiased">
        {pathname === '/login' ? (
          <StandaloneLayout>{children}</StandaloneLayout>
        ) : (
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
