export interface ConfigDatabase {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
  synchronize: boolean;
}

export interface ConfigGoogle {
  clientId: string;
  clientSecrete: string;
}

export interface Supabase {
  projectUrl: string;
  apiKey: string;
  serviceImagesBucketName: string;
}

export interface Config {
  database: ConfigDatabase;
  google: ConfigGoogle;
  supabase: Supabase;
}
