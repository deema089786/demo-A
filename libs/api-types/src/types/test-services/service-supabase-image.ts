import { Timestamp } from '../base';
import { Service } from './test-services';

export interface ServiceSupabaseImage extends Timestamp {
  id: string;
  serviceId: string;
  supabaseId: string;
  publicUrl: string;
  path: string;
  fullPath: string;

  service: Service | null;
}
