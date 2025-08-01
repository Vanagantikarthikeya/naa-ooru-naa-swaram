-- Create stories table for storing Telugu cultural stories
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  district TEXT,
  audio_url TEXT,
  type TEXT NOT NULL DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read stories (public stories)
CREATE POLICY "Stories are viewable by everyone" 
ON public.stories 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to insert stories
CREATE POLICY "Authenticated users can insert stories" 
ON public.stories 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON public.stories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample Telugu cultural stories
INSERT INTO public.stories (title, content, district, type) VALUES
('బోనాలు పండుగ', 'బోనాలు తెలంగాణ రాష్ట్రంలో జరుపుకునే ప్రముఖ పండుగ. ఇది మహాకాళీ దేవిని పూజించే పండుగ.', 'హైదరాబాద్', 'text'),
('సంక్రాంతి సంబరాలు', 'మకర సంక్రాంతి తెలుగు వారి ప్రధాన పండుగలలో ఒకటి. ఈ రోజు పట్టాలు ఎగురవేస్తారు.', 'విశాఖపట్టణం', 'text'),
('తీర్థయాత్ర కథలు', 'తిరుమల తిరుపతి వేంకటేశ్వర స్వామి దర్శనం చేసుకున్న భక్తుల అనుభవాలు.', 'చిత్తూరు', 'text');