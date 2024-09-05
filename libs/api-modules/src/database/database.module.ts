import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArray } from '@demo-A/api-types';

import { DatabaseService } from './database.service';
import { DatabaseModuleConfigProviderParams } from './database.types';
import { UsersRepository, ServicesRepository } from './repositories';

@Global()
@Module({})
export class DatabaseModule {
  static async forRootAsync(
    configProviderParams: DatabaseModuleConfigProviderParams,
  ): Promise<DynamicModule> {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: configProviderParams.imports,
          inject: configProviderParams.inject,
          useFactory: (...params) => {
            const typeOrmModuleParams = configProviderParams.useFactory(
              ...params,
            );
            return {
              type: 'postgres',
              entities: entitiesArray,
              ...typeOrmModuleParams,
              synchronize: typeOrmModuleParams.synchronize ?? false,
            };
          },
        }),
        TypeOrmModule.forFeature(entitiesArray),
      ],
      providers: [DatabaseService, UsersRepository, ServicesRepository],
      exports: [DatabaseService, UsersRepository, ServicesRepository],
    };
  }
}
