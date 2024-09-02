import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { importModules } from './app.import-modules';
import { modules } from './modules';

@Module({
  imports: [...importModules, ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
