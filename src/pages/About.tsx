import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Users, Globe } from 'lucide-react';

const About = () => {
  const motivationalQuotes = [
    {
      text: "మన సంస్కృతి మన గుర్తింపు. దానిని భవిష్యత్తుకు అందించడం మన బాధ్యత.",
      author: "తెలుగు వారసత్వం"
    },
    {
      text: "ప్రతి కథలో చరిత్ర ఉంది, ప్రతి మాటలో మన పూర్వికుల జ్ఞానం ఉంది.",
      author: "సాంప్రదాయిక జ్ఞానం"
    },
    {
      text: "మీ స్వరం మీ ప్రాంతం యొక్క ప్రతిధ్వని. దానిని లోకానికి వినిపించండి.",
      author: "స్వరం ప్రాజెక్ట్"
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "సంస్కృతిని పరిరక్షించండి",
      description: "మీ స్థలీయ సంప్రదాయాలను మరియు కథలను భవిష్యత్ తరాలకు అందించండి"
    },
    {
      icon: Users,
      title: "సమాజాన్ని కలపండి",
      description: "వివిధ ప్రాంతాల వారితో మీ అనుభవాలను పంచుకోండి"
    },
    {
      icon: Globe,
      title: "తెలుగు భాషను వ్యాప్తి చేయండి",
      description: "తెలుగు భాష మరియు సాహిత్యాన్ని ప్రపంచవ్యాప్తంగా చేరవేయండి"
    },
    {
      icon: Star,
      title: "మీ వారసత్వాన్ని గుర్తించండి",
      description: "మీ కుటుంబ చరిత్ర మరియు సంప్రదాయాలను డిజిటల్‌గా భద్రపరచండి"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="font-telugu text-4xl md:text-5xl font-bold text-primary">
            మా గురించి 🌟
          </h1>
          <p className="font-telugu text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            "నా ఊరు, నా స్వరం" ప్రాజెక్ట్ తెలుగు సంస్కృతిని మరియు సంప్రదాయాలను 
            డిజిటల్ యుగంలో పరిరక్షించడానికి ఒక అద్భుతమైన వేదిక.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 bg-gradient-cultural text-center shadow-cultural">
          <h2 className="font-telugu text-2xl font-bold text-white mb-4">
            మా లక్ష్యం
          </h2>
          <p className="font-telugu text-white/90 text-lg leading-relaxed">
            ప్రతి తెలుగు వ్యక్తి తమ ప్రాంత కథలను, సంప్రదాయాలను, మరియు అనుభవాలను 
            సురక్షితంగా భాగస్వామ్యం చేసే వేదికను అందించడం. మన సమృద్ధ వారసత్వాన్ని 
            భవిష్యత్ తరాలకు అందించడం.
          </p>
        </Card>

        {/* Motivational Quotes */}
        <div className="space-y-6">
          <h2 className="font-telugu text-3xl font-bold text-primary text-center">
            ప్రేరణాత్మక వాక్యాలు ✨
          </h2>
          <div className="grid md:grid-cols-1 gap-6">
            {motivationalQuotes.map((quote, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm shadow-cultural">
                <blockquote className="font-telugu text-lg italic text-foreground leading-relaxed mb-4">
                  "{quote.text}"
                </blockquote>
                <cite className="font-telugu text-sm text-primary font-semibold">
                  — {quote.author}
                </cite>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <h2 className="font-telugu text-3xl font-bold text-primary text-center">
            మా సేవలు 🎯
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm shadow-cultural hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-cultural rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-telugu font-semibold text-lg text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-telugu text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center bg-card/80 backdrop-blur-sm shadow-cultural">
          <h3 className="font-telugu text-2xl font-bold text-primary mb-4">
            మీరు కూడా భాగస్వామి అవ్వండి! 🤝
          </h3>
          <p className="font-telugu text-muted-foreground mb-6 leading-relaxed">
            మీ ప్రాంత కథలను, సంప్రదాయాలను పంచుకుని మన సమాజాన్ని మరింత సమృద్ధం చేయండి.
            ప్రతి కథ ఒక అమూల్యమైన వజ్రం లాంటిది.
          </p>
          <Button className="bg-gradient-cultural hover:bg-primary/90 shadow-gold font-telugu text-base px-8">
            ఇప్పుడే ప్రారంభించండి 🚀
          </Button>
        </Card>

        {/* Contact Info */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
          <h3 className="font-telugu text-lg font-semibold text-primary mb-2">
            సంప్రదింపు
          </h3>
          <p className="font-telugu text-muted-foreground">
            ఏవైనా సందేహాలు లేదా సూచనలు ఉంటే మాతో సంప్రదించండి. 
            మేము ఎల్లప్పుడూ మీ సేవలో ఉన్నాం! 📧
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;