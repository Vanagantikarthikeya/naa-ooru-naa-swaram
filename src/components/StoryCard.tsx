import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, MapPin } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  content: string;
  district: string;
  audioUrl?: string;
  type: 'audio' | 'text';
  timestamp: string;
}

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => story.audioUrl ? new Audio(story.audioUrl) : null);

  const togglePlayback = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  if (audio) {
    audio.onended = () => setIsPlaying(false);
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-cultural transition-all duration-300 hover:scale-[1.02]">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-telugu text-lg font-semibold text-primary line-clamp-2">
            {story.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="font-telugu">{story.district}</span>
          </div>
        </div>

        {story.type === 'audio' && story.audioUrl && (
          <div className="flex items-center gap-3">
            <Button
              onClick={togglePlayback}
              size="sm"
              variant="outline"
              className="flex-shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground font-telugu">
                🎧 ఆడియో కథ
              </div>
            </div>
          </div>
        )}

        <p className="font-telugu text-sm text-foreground/80 line-clamp-4 leading-relaxed">
          {story.content}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-telugu">
            {story.type === 'audio' ? '🎙️ వాయిస్ రికార్డింగ్' : '✍️ టెక్స్ట్ కథ'}
          </span>
          <span>{story.timestamp}</span>
        </div>
      </div>
    </Card>
  );
};