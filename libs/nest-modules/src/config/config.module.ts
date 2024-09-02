import { DynamicModule, Global, Module } from '@nestjs/common';
import convict, { Schema } from 'convict';

import { MODULE_CONFIG } from './config.constants';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static async forRoot<T = unknown>(schema: Schema<T>): Promise<DynamicModule> {
    return {
      module: ConfigModule,
      imports: [],
      providers: [
        {
          provide: MODULE_CONFIG,
          useFactory: () => {
            const config = convict(schema);
            config.validate({ allowed: 'strict' });
            return config.getProperties();
          },
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
