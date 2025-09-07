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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </>
  );
}

const AUTH_KEY = 'mindmirror-auth';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    try {
      const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';

      if (!isAuthenticated && pathname !== '/login') {
        router.push('/login');
      } else {
        setIsChecking(false);
      }
    } catch (error) {
       // If localStorage is not available, proceed without auth for SSR/testing
       setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking && pathname !== '/login') {
    // You can render a loading spinner here if you like
    return null;
  }

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return (
      <html lang="en">
        <StandaloneLayout>{children}</StandaloneLayout>
      </html>
    );
  }

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
