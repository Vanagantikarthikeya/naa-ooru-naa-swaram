import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Square, Upload, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioRecorderProps {
  onAudioUpload: (audioFile: File) => void;
}

export const AudioRecorder = ({ onAudioUpload }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "రికార్డింగ్ ప్రారంభం",
        description: "మీ కథను చెప్పడం ప్రారంభించండి...",
      });
    } catch (error) {
      toast({
        title: "రికార్డింగ్ లోపం",
        description: "మైక్రోఫోన్ యాక్సెస్ అవసరం",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "రికార్డింగ్ పూర్తి",
        description: "మీ కథ విజయవంతంగా రికార్డ్ చేయబడింది",
      });
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes('audio') || file.type.includes('video'))) {
      onAudioUpload(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioBlob(file);
      toast({
        title: "ఫైల్ అప్‌లోడ్ విజయం",
        description: "మీ ఆడియో ఫైల్ విజయవంతంగా అప్‌లోడ్ చేయబడింది",
      });
    } else {
      toast({
        title: "తప్పు ఫైల్ రకం",
        description: "దయచేసి ఆడియో ఫైల్‌ను ఎంచుకోండి",
        variant: "destructive",
      });
    }
  };

  const uploadRecording = () => {
    if (audioBlob) {
      const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      onAudioUpload(file);
      toast({
        title: "రికార్డింగ్ అప్‌లోడ్ విజయం",
        description: "మీ కథ విజయవంతంగా సేవ్ చేయబడింది",
      });
    }
  };

  return (
    <Card className="p-6 bg-gradient-warm shadow-cultural">
      <div className="space-y-4">
        <h3 className="font-telugu text-xl font-semibold text-primary">
          🎙️ ఆడియో రికార్డింగ్
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="bg-gradient-cultural hover:bg-primary/90 shadow-gold"
              size="lg"
            >
              <Mic className="w-4 h-4 mr-2" />
              రికార్డింగ్ ప్రారంభించండి
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
              size="lg"
              className="animate-pulse"
            >
              <Square className="w-4 h-4 mr-2" />
              రికార్డింగ్ ఆపండి
            </Button>
          )}

          <div className="relative">
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" size="lg">
              <Upload className="w-4 h-4 mr-2" />
              ఫైల్ అప్‌లోడ్
            </Button>
          </div>
        </div>

        {audioUrl && (
          <div className="space-y-3">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            
            <div className="flex items-center gap-2">
              <Button
                onClick={isPlaying ? pauseAudio : playAudio}
                variant="outline"
                size="sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                రికార్డ్ చేసిన ఆడియో
              </span>
            </div>

            {audioBlob && (
              <Button
                onClick={uploadRecording}
                className="w-full bg-accent hover:bg-accent/90"
              >
                రికార్డింగ్ సేవ్ చేయండి
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};