// Storage Service Layer
// File uploads for quote request attachments and review photos

import { supabase, isDemoMode } from './database';

export async function uploadFile(
  bucket: 'attachments' | 'review-photos' | 'deliverables' | 'avatars',
  file: File
): Promise<{ path: string; url?: string }> {
  // Max size limit 5MB
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File exceeds maximum size limit of 5 MB');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${fileName}`;

  if (isDemoMode || !supabase) {
    console.log(`[Demo Storage] Simulated upload of "${file.name}" to bucket "${bucket}"`);
    return {
      path: filePath,
      url: URL.createObjectURL(file)
    };
  }

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Storage upload error:', error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: publicUrlData?.publicUrl
  };
}
