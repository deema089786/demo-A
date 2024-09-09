export type Profile = {
  id: string;
  email: string | null;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  isPasswordCreated: boolean;
  isEditModeEnabled: boolean;
  supabase: {
    projectUrl: string;
    apiKey: string;
    serviceImagesBucketName: string;
  } | null;
};
