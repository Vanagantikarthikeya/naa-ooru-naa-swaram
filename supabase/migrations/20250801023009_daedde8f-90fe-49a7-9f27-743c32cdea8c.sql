-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('audio-stories', 'audio-stories', true);

-- Create storage policies for audio uploads
CREATE POLICY "Audio files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audio-stories');

CREATE POLICY "Anyone can upload audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audio-stories');

CREATE POLICY "Users can update their audio files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'audio-stories');

CREATE POLICY "Users can delete their audio files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'audio-stories');