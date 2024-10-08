import { Schema } from 'convict';

import { Config } from './config.types';

export const configSchema: Schema<Config> = {
  database: {
    host: {
      doc: '',
      format: String,
      env: 'DB_HOST',
      default: null,
    },
    database: {
      doc: '',
      format: String,
      env: 'DB_NAME',
      default: null,
    },
    username: {
      doc: '',
      format: String,
      env: 'DB_USERNAME',
      default: null,
    },
    password: {
      doc: '',
      format: String,
      env: 'DB_PASSWORD',
      default: null,
    },
    port: {
      doc: '',
      format: Number,
      env: 'DB_PORT',
      default: null,
    },
    synchronize: {
      doc: '',
      format: Boolean,
      env: 'DB_SYNCHRONIZE',
      default: false,
    },
  },
  google: {
    clientId: {
      doc: '',
      format: String,
      env: 'GOOGLE_CLIENT_ID',
      default: null,
    },
    clientSecrete: {
      doc: '',
      format: String,
      env: 'GOOGLE_CLIENT_SECRET',
      default: null,
    },
  },
  supabase: {
    projectUrl: {
      doc: '',
      format: String,
      env: 'SUPABASE_PROJECT_URL',
      default: null,
    },
    apiKey: {
      doc: '',
      format: String,
      env: 'SUPABASE_API_KEY',
      default: null,
    },
    serviceImagesBucketName: {
      doc: '',
      format: String,
      env: 'SUPABASE_SERVICE_IMAGES_BUCKET_NAME',
      default: null,
    },
  },
};
