import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { ImageUpload } from './admin/ImageUpload';
import { DesignFormFields } from './admin/DesignFormFields';
import { SubmitButton } from './ui/SubmitButton';

export function AdminDesignForm() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    try {
      // Upload image
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: imageData, error: uploadError } = await supabase.storage
        .from('designs')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicURL } = supabase.storage
        .from('designs')
        .getPublicUrl(fileName);

      // Create design with fixed price
      const { error: insertError } = await supabase.from('designs').insert({
        title,
        description,
        price: 350.00, // Fixed price
        image_url: publicURL.publicUrl,
      });

      if (insertError) throw insertError;

      toast.success('Design uploaded successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload image={image} onImageChange={setImage} />
      <DesignFormFields
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />
      <SubmitButton loading={loading} />
    </form>
  );
}