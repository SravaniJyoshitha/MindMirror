
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './button';
import { LifeBuoy, Phone } from 'lucide-react';
import Link from 'next/link';

interface SafetyAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SafetyAlertDialog({ open, onOpenChange }: SafetyAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <LifeBuoy />
            Your Safety is Important to Us
          </AlertDialogTitle>
          <AlertDialogDescription>
            It sounds like you are going through a difficult time. Please know
            that there is support available, and you don&apos;t have to go
            through this alone. Help is available.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 space-y-4">
          <p>
            Please consider reaching out to a professional who can support you.
            Here are some options:
          </p>
          <Button asChild variant="outline" className="w-full">
            <a href="tel:988" className="flex items-center gap-2">
              <Phone />
              Call the Crisis & Suicide Lifeline: 988
            </a>
          </Button>
          <Button asChild className="w-full">
            <Link href="https://988lifeline.org/chat/" target="_blank">
              Chat with 988 Lifeline
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            If you are in immediate danger, please call 911.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
