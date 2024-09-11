import { z } from 'zod';

import { Timestamp } from '../base';
import { Service } from './_services';

export interface ServiceSupabaseImage extends Timestamp {
  id: string;
  serviceId: string;
  supabaseId: string;
  publicUrl: string;
  path: string;
  fullPath: string;

  service: Service | null;
}

export const supabaseImagePayloadSchema = z.object({
  id: z.string(),
  publicUrl: z.string(),
  path: z.string(),
  fullPath: z.string(),
});
