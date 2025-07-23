import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AudioRecorder } from '@/components/AudioRecorder';
import { StoryCard } from '@/components/StoryCard';
import { useToast } from '@/hooks/use-toast';
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
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: 'మా ఊరి పండుగలు',
      content: 'మా గ్రామంలో ప్రతి సంవత్సరం జాతర జరుగుతుంది. అది చాలా ఘనంగా జరుగుతుంది. మొత్తం ఊరు వాళ్ళు కలిసి పండుగ చేసుకుంటారు. ప్రకృతి అందంగా ఉంటుంది. పచ్చిక పొలాలు, కోకిలల కూత, చెట్లకొమ్మలమీద పక్షుల సందడి చూస్తే మనసుకు చాలా హాయిగా అనిపిస్తుంది.',
      district: 'గుంటూరు',
      type: 'text',
      timestamp: '2 గంటల క్రితం'
    },
    {
      id: '2',
      title: 'తాతగారి కథలు',
      content: 'మా తాతగారు చాలా బాగా కథలు చెప్పేవారు. రాత్రి వేళల్లో అందరం కలిసి కూర్చుని వినేవాళ్ళం. ఆయన చెప్పే కథలు అంటే మాకు ఎంతో ఇష్టం. పాత కాలపు వీరుల గురించి, రాజుల గురించి, మంచి మనుషుల గురించి చెప్పేవారు.',
      district: 'కృష్ణా',
      type: 'text',
      timestamp: '5 గంటల క్రితం'
    },
    {
      id: '3',
      title: 'మా గ్రామ దేవాలయం',
      content: 'మా ఊరిలో చాలా పాత దేవాలయం ఉంది. అది మా పూర్వికుల కాలం నుండి ఉంది. ప్రతి రోజు ఉదయం సాయంత్రం పూజలు జరుగుతాయి. భక్తులు దూరదూర ప్రాంతాల నుండి వస్తారు. దేవుని దర్శనం చేసుకుని వెళ్ళిపోతారు.',
      district: 'చిత్తూరు',
      audioUrl: '/placeholder-audio.mp3',
      type: 'audio',
      timestamp: '1 రోజు క్రితం'
    }
  ]);

  const { toast } = useToast();

  const districts = [
    'విశాఖపట్నం', 'విజయనగరం', 'శ్రీకాకుళం', 'గుంటూరు', 'కృష్ణా', 'వెస్ట్ గోదావరి',
    'ఈస్ట్ గోదావరి', 'ప్రకాశం', 'నెల్లూరు', 'చిత్తూరు', 'కడప', 'అనంతపురం',
    'కర్నూలు', 'హైదరాబాద్', 'రంగారెడ్డి', 'మెదచల్', 'సంగారెడ్డి', 'వరంగల్',
    'నిజామాబాద్', 'కరీంనగర్', 'ఆదిలాబాద్', 'కొమురం భీమ్', 'మంచిర్యాల', 'ఖమ్మం'
  ];

  const handleTextSubmit = () => {
    if (!textContent.trim() || !selectedDistrict || !storyTitle.trim()) {
      toast({
        title: "అసంపూర్ణ సమాచారం",
        description: "దయచేసి అన్ని ఫీల్డ్‌లను పూర్తి చేయండి",
        variant: "destructive",
      });
      return;
    }

    const newStory: Story = {
      id: Date.now().toString(),
      title: storyTitle,
      content: textContent,
      district: selectedDistrict,
      type: 'text',
      timestamp: 'ఇప్పుడే'
    };

    setStories(prev => [newStory, ...prev]);
    setTextContent('');
    setStoryTitle('');
    setSelectedDistrict('');

    toast({
      title: "కథ జోడించబడింది! 🎉",
      description: "మీ కథ విజయవంతంగా భాగస్వామ్యం చేయబడింది",
    });
  };

  const handleAudioUpload = (audioFile: File) => {
    // In a real app, you would upload this to a server
    const audioUrl = URL.createObjectURL(audioFile);
    
    const newStory: Story = {
      id: Date.now().toString(),
      title: storyTitle || 'ఆడియో కథ',
      content: 'ఇది ఒక ఆడియో రికార్డింగ్. వినడానికి ప్లే బటన్ నొక్కండి.',
      district: selectedDistrict || 'తెలియని జిల్లా',
      audioUrl,
      type: 'audio',
      timestamp: 'ఇప్పుడే'
    };

    setStories(prev => [newStory, ...prev]);
    setStoryTitle('');
    setSelectedDistrict('');
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${culturalBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/60"></div>
        
        {/* Header Section */}
        <div className="relative z-10 px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-telugu text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              నా ఊరు, నా స్వరం
            </h1>
            <p className="font-telugu text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              మీ ప్రాంతాన్ని వివరించండి లేదా మీ సంప్రదాయాన్ని తెలుగులో పంచుకోండి 📜
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-white/80">
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">🏛️ సంస్కృతి</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">🎭 సంప్రదాయాలు</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">🗣️ కథలు</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">📍 స్థలాలు</span>
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
              ✍️ మీ కథను వ్రాయండి
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="font-telugu text-sm font-medium text-foreground mb-2 block">
                  కథ శీర్షిక
                </label>
                <Textarea
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="మీ కథకు శీర్షిక ఇవ్వండి..."
                  className="font-telugu resize-none h-16"
                />
              </div>

              <div>
                <label className="font-telugu text-sm font-medium text-foreground mb-2 block">
                  జిల్లా / ప్రాంతం
                </label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="font-telugu">
                    <SelectValue placeholder="మీ జిల్లాను ఎంచుకోండి" />
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
                  మీ కథ
                </label>
                <Textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="మీ ఊరి గురించి, సంప్రదాయాల గురించి, లేదా ఏదైనా ప్రత్యేకమైన విషయం గురించి వ్రాయండి..."
                  className="font-telugu min-h-[120px] leading-relaxed"
                />
              </div>

              <Button 
                onClick={handleTextSubmit}
                className="w-full bg-gradient-cultural hover:bg-primary/90 shadow-gold font-telugu text-base"
                size="lg"
              >
                కథను పంచుకోండి 🌟
              </Button>
            </div>
          </Card>

          {/* Audio Input */}
          <AudioRecorder onAudioUpload={handleAudioUpload} />
        </div>

        {/* Stories Section */}
        <div className="space-y-6">
          <h2 className="font-telugu text-3xl font-bold text-primary text-center">
            🏛️ ఇతర కథలు మరియు సంప్రదాయాలు
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {stories.length === 0 && (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
              <h3 className="font-telugu text-xl font-semibold text-muted-foreground mb-2">
                ఇంకా కథలు లేవు
              </h3>
              <p className="font-telugu text-muted-foreground">
                మీరే మొదటి కథను పంచుకోండి! 🌟
              </p>
            </Card>
          )}
        </div>

        {/* Thank You Section */}
        <Card className="p-8 bg-gradient-cultural text-center shadow-cultural">
          <h3 className="font-telugu text-2xl font-bold text-white mb-4">
            🙏 ధన్యవాదాలు
          </h3>
          <p className="font-telugu text-white/90 leading-relaxed">
            మీ సంస్కృతిని మరియు సంప్రదాయాలను భాగస్వామ్యం చేసినందుకు ధన్యవాదాలు. 
            మీ కథలు మన వారసత్వాన్ని భవిష్యత్ తరాలకు అందించడంలో సహాయపడతాయి.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Index;