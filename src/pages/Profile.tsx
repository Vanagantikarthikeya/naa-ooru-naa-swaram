import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, MapPin, Calendar, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'రాముడు శర్మ',
    email: 'ramu@example.com',
    district: 'గుంటూరు',
    bio: 'నేను తెలుగు సంస్కృతిని ప్రేమించే వ్యక్తిని. మా ఊరి పండుగలు మరియు సంప్రదాయాల గురించి కథలు చెప్పడం నాకు చాలా ఇష్టం.',
    joinDate: '2024-01-15',
    storiesCount: 12,
    audioBooksCount: 5
  });

  const { toast } = useToast();

  const districts = [
    'విశాఖపట్నం', 'విజయనగరం', 'శ్రీకాకుళం', 'గుంటూరు', 'కృష్ణా', 'వెస్ట్ గోదావరి',
    'ఈస్ట్ గోదావరి', 'ప్రకాశం', 'నెల్లూరు', 'చిత్తూరు', 'కడప', 'అనంతపురం',
    'కర్నూలు', 'హైదరాబాద్', 'రంగారెడ్డి', 'మెదచల్', 'సంగారెడ్డి', 'వరంగల్',
    'నిజామాబాద్', 'కరీంనగర్', 'ఆదిలాబాద్', 'కొమురం భీమ్', 'మంచిర్యాల', 'ఖమ్మం'
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "ప్రొఫైల్ అప్‌డేట్ అయ్యింది! ✅",
      description: "మీ ప్రొఫైల్ సమాచారం విజయవంతంగా సేవ్ చేయబడింది",
    });
  };

  const stats = [
    { label: 'కథలు', value: profile.storiesCount, icon: '📖' },
    { label: 'ఆడియో రికార్డింగ్‌లు', value: profile.audioBooksCount, icon: '🎵' },
    { label: 'మొత్తం వీక్షణలు', value: '234', icon: '👀' },
    { label: 'లైక్‌లు', value: '89', icon: '❤️' }
  ];

  const achievements = [
    { title: 'కథా రచయిత', description: '10+ కథలు పంచుకున్నారు', badge: '🏆' },
    { title: 'సంస్కృతి రాయబారి', description: 'సంప్రదాయాలను భాగస్వామ్యం చేశారు', badge: '🎭' },
    { title: 'ఆడియో కథకుడు', description: '5+ ఆడియో కథలు రికార్డ్ చేశారు', badge: '🎤' }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Back Button */}
      <div className="p-4">
        <Link to="/">
          <Button variant="ghost" className="font-telugu">
            <ArrowLeft className="w-4 h-4 mr-2" />
            వెనుకకు
          </Button>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-cultural">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl font-telugu bg-gradient-cultural text-white">
                రా
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="font-telugu text-lg"
                    placeholder="మీ పేరు"
                  />
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    placeholder="ఇమెయిల్"
                  />
                  <Select value={profile.district} onValueChange={(value) => setProfile({...profile, district: value})}>
                    <SelectTrigger className="font-telugu">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district} className="font-telugu">
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="font-telugu"
                    placeholder="మీ గురించి కొంచెం చెప్పండి..."
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <h1 className="font-telugu text-3xl font-bold text-primary">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-telugu">{profile.district}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="font-telugu">సేవలో చేరినది: {profile.joinDate}</span>
                  </div>
                  <p className="font-telugu text-muted-foreground leading-relaxed mt-4 max-w-md">
                    {profile.bio}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              variant={isEditing ? "default" : "outline"}
              className="font-telugu"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  సేవ్ చేయండి
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  ఎడిట్ చేయండి
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-card/80 backdrop-blur-sm shadow-cultural">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="font-telugu text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-cultural">
          <h2 className="font-telugu text-2xl font-bold text-primary mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2" />
            సాధనలు
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-4 bg-gradient-cultural/10 rounded-lg">
                <div className="text-3xl mb-2">{achievement.badge}</div>
                <h3 className="font-telugu font-semibold text-primary mb-1">
                  {achievement.title}
                </h3>
                <p className="font-telugu text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-cultural">
          <h2 className="font-telugu text-2xl font-bold text-primary mb-6">
            ఇటీవలి కార్యకలాపాలు
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-cultural/5 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="font-telugu text-sm">కొత్త కథ "మా ఊరి దేవాలయం" పంచుకున్నారు</p>
                <p className="text-xs text-muted-foreground">2 గంటల క్రితం</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-cultural/5 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="font-telugu text-sm">ఆడియో రికార్డింగ్ అప్‌లోడ్ చేశారు</p>
                <p className="text-xs text-muted-foreground">1 రోజు క్రితం</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-cultural/5 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="font-telugu text-sm">ప్రొఫైల్ అప్‌డేట్ చేశారు</p>
                <p className="text-xs text-muted-foreground">3 రోజుల క్రితం</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;