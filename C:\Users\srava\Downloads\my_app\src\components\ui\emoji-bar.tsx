
'use client';

import { Button } from '@/components/ui/button';
import { Angry, Frown, Laugh, Meh } from 'lucide-react';

interface EmojiBarProps {
  onEmojiSelect: (emoji: string) => void;
}

const emojis = [
  { icon: '😄', label: 'Happy' },
  { icon: '😢', label: 'Sad' },
  { icon: '😠', label: 'Angry' },
  { icon: '🤔', label: 'Thinking' },
];

export function EmojiBar({ onEmojiSelect }: EmojiBarProps) {
  return (
    <div className="flex justify-center gap-2 my-2">
      {emojis.map(({ icon, label }) => (
        <Button
          key={label}
          variant="outline"
          size="icon"
          className="text-xl rounded-full"
          onClick={() => onEmojiSelect(icon)}
          aria-label={label}
          title={label}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
