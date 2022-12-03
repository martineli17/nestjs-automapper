import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { EntityToDtoMapper } from './mappers/entityToDto.mapper';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [EntityToDtoMapper],
})
export class AppModule {}
