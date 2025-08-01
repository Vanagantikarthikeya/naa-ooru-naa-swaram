import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AudioRecorder } from '@/components/AudioRecorder';
import { StoryCard } from '@/components/StoryCard';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Languages, Loader2 } from 'lucide-react';
import culturalBg from '@/assets/telugu-cultural-bg.jpg';

interface Story {
  id: string;
  title: string;
  content: string;
  district: string;
  audioUrl?: string;
  type: 'audio' | 'text';
  timestamp: string;
}

const Index = () => {
  const [textContent, setTextContent] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { toast } = useToast();

  // Fetch stories from database
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedStories: Story[] = data.map((story) => ({
        id: story.id,
        title: story.title,
        content: story.content,
        district: story.district || 'Unknown',
        audioUrl: story.audio_url || undefined,
        type: story.type as 'audio' | 'text',
        timestamp: new Date(story.created_at).toLocaleDateString('te-IN')
      }));

      setStories(formattedStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load stories',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const districts = [
    'విశాఖపట్నం', 'విజయనగరం', 'శ్రీకాకుళం', 'గుంటూరు', 'కృష్ణా', 'వెస్ట్ గోదావరి',
    'ఈస్ట్ గోదావరి', 'ప్రకాశం', 'నెల్లూరు', 'చిత్తూరు', 'కడప', 'అనంతపురం',
    'కర్నూలు', 'హైదరాబాద్', 'రంగారెడ్డి', 'మెదచల్', 'సంగారెడ్డి', 'వరంగల్',
    'నిజామాబాద్', 'కరీంనగర్', 'ఆదిలాబాద్', 'కొమురం భీమ్', 'మంచిర్యాల', 'ఖమ్మం'
  ];

  const handleTextSubmit = async () => {
    if (!textContent.trim() || !selectedDistrict || !storyTitle.trim()) {
      toast({
        title: t('incompleteInfo'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('stories')
        .insert({
          title: storyTitle,
          content: textContent,
          district: selectedDistrict,
          type: 'text'
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state for immediate UI update
      const newStory: Story = {
        id: data.id,
        title: data.title,
        content: data.content,
        district: data.district || 'Unknown',
        type: data.type as 'audio' | 'text',
        timestamp: new Date(data.created_at).toLocaleDateString('te-IN')
      };

      setStories(prev => [newStory, ...prev]);
      setTextContent('');
      setStoryTitle('');
      setSelectedDistrict('');

      toast({
        title: t('storyAdded'),
        description: t('storyShared'),
      });
    } catch (error) {
      console.error('Error saving story:', error);
      toast({
        title: 'Error',
        description: 'Failed to save story',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAudioUpload = async (audioFile: File) => {
    if (!storyTitle.trim() || !selectedDistrict) {
      toast({
        title: t('incompleteInfo'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Upload audio file to Supabase Storage
      const fileName = `${Date.now()}-${audioFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio-stories')
        .upload(fileName, audioFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('audio-stories')
        .getPublicUrl(fileName);

      // Save story to database
      const { data, error } = await supabase
        .from('stories')
        .insert({
          title: storyTitle,
          content: t('audioRecordingDesc'),
          district: selectedDistrict,
          audio_url: publicUrl,
          type: 'audio'
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state for immediate UI update
      const newStory: Story = {
        id: data.id,
        title: data.title,
        content: data.content,
        district: data.district || 'Unknown',
        audioUrl: data.audio_url || undefined,
        type: data.type as 'audio' | 'text',
        timestamp: new Date(data.created_at).toLocaleDateString('te-IN')
      };

      setStories(prev => [newStory, ...prev]);
      setStoryTitle('');
      setSelectedDistrict('');

      toast({
        title: t('storyAdded'),
        description: t('storyShared'),
      });
    } catch (error) {
      console.error('Error saving audio story:', error);
      toast({
        title: 'Error',
        description: 'Failed to save audio story',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      {/* Hero Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${culturalBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/60"></div>
        
        
        {/* Header Section */}
        <div className="relative z-10 px-4 py-16 text-center">
          {/* Language Toggle - Top Right */}
          <div className="absolute top-4 right-4">
            <Button 
              onClick={toggleLanguage}
              variant="outline" 
              className={`font-telugu bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 ${
                language === 'en' ? 'bg-white/20' : ''
              }`}
            >
              <Languages className="w-4 h-4 mr-2" />
              {t('converter')} ({language === 'te' ? 'EN' : 'TE'})
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="font-telugu text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {t('siteTitle')}
            </h1>
            <p className="font-telugu text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {t('siteSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-white/80">
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{t('culture')}</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{t('traditions')}</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{t('stories')}</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{t('places')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Text Input */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-cultural">
            <h2 className="font-telugu text-2xl font-semibold text-primary mb-6">
              {t('writeStory')}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="font-telugu text-sm font-medium text-foreground mb-2 block">
                  {t('storyTitle')}
                </label>
                <Textarea
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder={language === 'te' ? "మీ కథకు శీర్షిక ఇవ్వండి..." : "Give a title to your story..."}
                  className="font-telugu resize-none h-16"
                />
              </div>

              <div>
                <label className="font-telugu text-sm font-medium text-foreground mb-2 block">
                  {t('district')}
                </label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="font-telugu">
                    <SelectValue placeholder={t('selectDistrict')} />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district} className="font-telugu">
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-telugu text-sm font-medium text-foreground mb-2 block">
                  {t('yourStory')}
                </label>
                <Textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder={t('storyPlaceholder')}
                  className="font-telugu min-h-[120px] leading-relaxed"
                />
              </div>

              <Button 
                onClick={handleTextSubmit}
                disabled={submitting}
                className="w-full bg-gradient-cultural hover:bg-primary/90 shadow-gold font-telugu text-base"
                size="lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'te' ? 'సేవ్ చేస్తోంది...' : 'Saving...'}
                  </>
                ) : (
                  t('shareStory')
                )}
              </Button>
            </div>
          </Card>

          {/* Audio Input */}
          <AudioRecorder onAudioUpload={handleAudioUpload} />
        </div>

        {/* Stories Section */}
        <div className="space-y-6">
          <h2 className="font-telugu text-3xl font-bold text-primary text-center">
            {t('otherStories')}
          </h2>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 bg-card/50 backdrop-blur-sm animate-pulse">
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>

              {stories.length === 0 && (
                <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
                  <h3 className="font-telugu text-xl font-semibold text-muted-foreground mb-2">
                    {t('noStories')}
                  </h3>
                  <p className="font-telugu text-muted-foreground">
                    {t('noStoriesDesc')}
                  </p>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Thank You Section */}
        <Card className="p-8 bg-gradient-cultural text-center shadow-cultural">
          <h3 className="font-telugu text-2xl font-bold text-white mb-4">
            {t('thankYou')}
          </h3>
          <p className="font-telugu text-white/90 leading-relaxed">
            {t('thankYouDesc')}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Index;