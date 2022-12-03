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