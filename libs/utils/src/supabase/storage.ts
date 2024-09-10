import { v4 as uuid } from 'uuid';
import { createClient } from '@supabase/supabase-js';

export type UploadFileToStorageParams = {
  file: File;
  bucket: string;
  fileName?: string;
  auth: { projectUrl: string; apiKey: string };
};

export type UploadFileToStorageParamsResult = {
  id: string;
  publicUrl: string;
  path: string;
  fullPath: string;
};

export const uploadFileToStorage = async (
  params: UploadFileToStorageParams,
): Promise<UploadFileToStorageParamsResult> => {
  const fileName = params.fileName || uuid();
  const supabaseClient = createClient(
    params.auth.projectUrl,
    params.auth.apiKey,
  );

  const { data, error } = await supabaseClient.storage
    .from(params.bucket)
    .upload(fileName, params.file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;
  if (!data) throw new Error('No data');

  const {
    data: { publicUrl },
  } = supabaseClient.storage.from(params.bucket).getPublicUrl(data.path);

  return {
    id: data.id,
    publicUrl,
    path: data.path,
    fullPath: data.fullPath,
  };
};

export type DeleteFileFromStorageParams = {
  bucket: string;
  path: string;
  auth: { projectUrl: string; apiKey: string };
};

export const deleteFileFromStorage = async (
  params: DeleteFileFromStorageParams,
) => {
  const supabaseClient = createClient(
    params.auth.projectUrl,
    params.auth.apiKey,
  );

  const { data, error } = await supabaseClient.storage
    .from(params.bucket)
    .remove([params.path]);

  if (error) throw error;
  return data;
};
