
'use client';

import {
  Sprout,
  MessageSquare,
  Bot,
  Sparkles,
  Home,
  LogOut,
  GitBranch,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Button } from './ui/button';
import { useAge } from '@/app/layout';

const AUTH_KEY = 'mindmirror-auth';
const USER_AGE_KEY = 'mindmirror-user-age';

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isChild } = useAge();

  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(USER_AGE_KEY);
      router.push('/login');
    } catch (error) {
      console.error('Could not log out', error);
      // still try to redirect
      router.push('/login');
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/sparks', label: isChild ? 'Sparkle Bot' : 'SparkAI', icon: Bot },
    { href: '/whispers', label: 'Whispers', icon: MessageSquare },
    { href: '/echoes', label: 'Echoes', icon: GitBranch },
    { href: '/garden', label: isChild ? 'Garden' : 'Journal', icon: Sprout },
  ];

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="h-14 items-center justify-center gap-2 group-data-[collapsible=icon]:hidden">
          <Sparkles className="size-6 text-primary" />
          <span className="text-lg font-bold font-headline">MindMirror+</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    item.href === '/'
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                  tooltip={item.label}
                  className="justify-center md:justify-start"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Logout"
                className="justify-center md:justify-start"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Sparkles className="size-6 text-primary" />
            <span className="font-headline">MindMirror+</span>
          </Link>
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
