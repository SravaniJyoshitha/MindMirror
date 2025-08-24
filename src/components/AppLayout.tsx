'use client';

import { Bot, Sprout, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';

const navItems = [
  { href: '/', label: 'Avatar', icon: Bot },
  { href: '/garden', label: 'Garden', icon: Sprout },
  { href: '/whispers', label: 'Whispers', icon: MessageSquare },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

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
