import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role, RoleKey } from 'server/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findByKey(...keys: RoleKey[]) {
    return this.rolesRepository.find({ where: { key: In(keys) } });
  }

  findByIds(ids: number[]) {
    return this.rolesRepository.findByIds(ids);
  }

  find(id: number, relations: string[] = []) {
    return this.rolesRepository.findOne(id, { relations });
  }
}
