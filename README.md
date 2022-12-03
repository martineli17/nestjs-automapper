<h1>NestJs - Mapeando objetos com AutoMapper</h1>
<p>
  Na maioria das aplicações, sempre há a necessidade de mapear um objeto que contém os dados de origem para um outro objeto de destino.
</p>
<p>
  Um exemplo disso é quando temos uma classe do tipo Entidade e queremos retornar os dados dela através de um DTO específico.
</p>
<p>
  Para evitar mapear cada campo manualmente em todos os lugares que for necessário essa conversão, existem bibliotecas específicas para este cenário. Dentre elas, temos a <b>AutoMapper</b>.
</p>

<h2>Instalação</h2>
<p>
  Inicialmente, precisamos instalar algumas dependências. São elas:
  <ul>
    <li>@automapper\classes</li>
    <li>@automapper\core</li>
    <li>@automapper\nestjs</li>
  </ul>
</p>

<h2>Module</h2>
<p>
  Você pode criar um modulo específico para o AutoMapper, a fim de separar melhor o código. Neste exemplo, foi inserido dentro do próprio 'app.module'.
</p>
<p>
  É necessário você inserir no 'provider' do modulo, os mappers que você precisa naquele módulo. Assim, o AutoMapper irá identificar a configuração do mapeamento.
</p>

```javascript

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

```
<h2>Mappers</h2>
<p>
  Para adicionar o mapeamento das classes, é necessário criar um mapper específico. Neste mapper, você irá informar como deve ocorrer o mapeamento entre as classes de origem e destino.
</p>

```javascript

import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Dto } from "src/objects/dto";
import { Entity } from "src/objects/entity";

@Injectable()
export class EntityToDtoMapper extends AutomapperProfile{
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }
    
    get profile(): MappingProfile {
       return (mapper) => {
        createMap(mapper, Entity, Dto, 
            forMember((dest) => dest.name, mapFrom(src => src.name))
        );
       }
    }
}

```

<h2>Utilização</h2>
<p>
  É necessário injetar, via Dependency Injection, o AutoMapper através da classe 'Mapper'. Após isso, basta utilizar as funções 'map' ou 'mapArray', informando: objeto de origem, type de origem, type de destino.
</p>

```javascript

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

```
