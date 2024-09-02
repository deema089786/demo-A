import { ConfigModule, ConfigService } from '@demo-A/nest-modules';
import { DatabaseModule } from '@demo-A/api-modules';
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { ClsModule } from 'nestjs-cls';

import { Config, configSchema } from './config';

const clsModule = ClsModule.forRoot({
  global: true,
  middleware: {
    mount: true,
    setup: (cls, req) => {
      cls.set('user', null);
      // get request (user) IP if hosting by Cloudflare
      cls.set('requestIp', req.headers['cf-connecting-ip'] || null);
    },
  },
});

const configModule = ConfigModule.forRoot(configSchema);

const databaseModule = DatabaseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService<Config>) => {
    const databaseConfig = configService.getBy('database');
    return {
      host: databaseConfig.host,
      database: databaseConfig.database,
      username: databaseConfig.username,
      password: databaseConfig.password,
      port: databaseConfig.port,
      synchronize: databaseConfig.synchronize,
    };
  },
});

export const importModules: Array<
  DynamicModule | Promise<DynamicModule> | ForwardReference
> = [clsModule, configModule, databaseModule];
