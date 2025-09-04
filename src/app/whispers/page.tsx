import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WhisperForm } from '@/components/WhisperForm';

const whispers = [
  "I'm feeling overwhelmed with work, but I'm afraid to tell anyone.",
  "Sometimes I feel incredibly lonely, even when I'm surrounded by people.",
  'I achieved a small goal today and I am secretly very proud of myself.',
  "I miss someone I can't talk to anymore, and it hurts.",
  'It feels like everyone else has their life figured out except for me.',
  'I am grateful for the sunshine today. It made me smile.',
  'Struggling with motivation lately. It is hard to get started on anything.',
  'I wish I could go back in time for just one day.',
];

export default function WhispersPage() {
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline mb-2">
          Anonymous Thought Stream
        </h1>
        <p className="text-muted-foreground">
          A place to share your thoughts and feelings without judgment. You are
          not alone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader>
              <CardTitle>Share a Thought</CardTitle>
              <CardDescription>
                Your thoughts are safe here. Share anonymously and receive a
                supportive reflection from our AI companion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhisperForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 font-headline">
            Community Stream
          </h2>
          <div className="space-y-4">
            {whispers.map((whisper, index) => (
              <Card key={index} className="bg-card/80">
                <CardContent className="p-4">
                  <p className="italic text-card-foreground">“{whisper}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}