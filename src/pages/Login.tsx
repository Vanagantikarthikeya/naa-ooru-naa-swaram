import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "అసంపూర్ణ సమాచారం",
        description: "దయచేసి అన్ని ఫీల్డ్‌లను పూర్తి చేయండి",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "లాగిన్ విజయవంతం! 🎉",
      description: "మీరు విజయవంతంగా లాగిన్ అయ్యారు",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast({
        title: "అసంపూర్ణ సమాచారం",
        description: "దయచేసి అన్ని ఫీల్డ్‌లను పూర్తి చేయండి",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "పాస్‌వర్డ్ మ్యాచ్ కాలేదు",
        description: "దయచేసి పాస్‌వర్డ్‌లను సరిగ్గా టైప్ చేయండి",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "రిజిస్ట్రేషన్ విజయవంతం! 🎉",
      description: "మీ ఖాతా విజయవంతంగా సృష్టించబడింది",
    });
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} లాగిన్`,
      description: `${provider} ద్వారా లాగిన్ అవుతోంది...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" className="font-telugu">
            <ArrowLeft className="w-4 h-4 mr-2" />
            వెనుకకు
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
        <Card className="p-8 bg-card/90 backdrop-blur-sm shadow-cultural">
          <div className="text-center mb-8">
            <h1 className="font-telugu text-3xl font-bold text-primary mb-2">
              స్వాగతం! 🙏
            </h1>
            <p className="font-telugu text-muted-foreground">
              మీ కథలను పంచుకోవడానికి లాగిన్ అవ్వండి
            </p>
          </div>

          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="font-telugu">లాగిన్</TabsTrigger>
              <TabsTrigger value="signup" className="font-telugu">రిజిస్టర్</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">ఇమెయిల్</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      placeholder="మీ ఇమెయిల్ ఇవ్వండి"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">పాస్‌వర్డ్</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      placeholder="మీ పాస్‌వర్డ్ ఇవ్వండి"
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-cultural hover:bg-primary/90 font-telugu">
                  లాగిన్ అవ్వండి
                </Button>
              </form>

              <div className="text-center">
                <Button variant="link" className="font-telugu text-sm">
                  పాస్‌వర్డ్ మర్చిపోయారా?
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">పూర్తి పేరు</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      placeholder="మీ పూర్తి పేరు ఇవ్వండి"
                      className="pl-10 font-telugu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">ఇమెయిల్</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      placeholder="మీ ఇమెయిల్ ఇవ్వండి"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">ఫోన్ నంబర్</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                      placeholder="మీ ఫోన్ నంబర్ ఇవ్వండి"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">పాస్‌వర్డ్</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      placeholder="పాస్‌వర్డ్ సృష్టించండి"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-telugu text-sm font-medium">పాస్‌వర్డ్ ధృవీకరణ</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      placeholder="పాస్‌వర్డ్ మళ్లీ టైప్ చేయండి"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-cultural hover:bg-primary/90 font-telugu">
                  రిజిస్టర్ అవ్వండి
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Separator className="my-4" />
            <p className="text-center font-telugu text-sm text-muted-foreground mb-4">
              లేదా దీని ద్వారా కొనసాగించండి
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Google')}
                className="font-telugu"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Facebook')}
                className="font-telugu"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-telugu text-xs text-muted-foreground">
              రిజిస్టర్ అవ్వడం ద్వారా మీరు మా నిబంధనలు మరియు గోప్యతా విధానాన్ని అంగీకరిస్తున్నారు
            </p>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;