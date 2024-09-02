import { ModuleMetadata } from '@nestjs/common';

export interface DatabaseModuleConfig {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
  synchronize?: boolean;
}

export interface DatabaseModuleConfigProviderParams {
  useFactory: (...params: any[]) => DatabaseModuleConfig;
  inject: unknown[];
  imports: ModuleMetadata['imports'];
}
