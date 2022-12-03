import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Get } from '@nestjs/common';
import { Dto } from './objects/dto';
import { Entity } from './objects/entity';

@Controller()
export class AppController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  async getDto(): Promise<Dto> {
    const entity = new Entity("Entity To DTO");
    const dto = await this.mapper.mapAsync(entity, Entity, Dto);

    return dto;
  }
}
