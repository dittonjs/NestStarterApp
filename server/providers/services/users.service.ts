import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Role, RoleKey } from 'server/entities/role.entity';
import { UserRole } from 'server/entities/user_role.entity';
import { intersection, isEmpty } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(relations: string[] = []) {
    return this.usersRespository.find({ relations });
  }

  findBy(options: Record<string, any>, relations: string[] = []) {
    return this.usersRespository.findOne(options, { relations });
  }

  find(id: number, relations: string[] = []) {
    return this.usersRespository.findOne(id, { relations });
  }

  create(user: User) {
    return this.usersRespository.save(user);
  }

  async verify(email: string, password: string) {
    const user = await this.usersRespository.findOne({ email }, { relations: ['refreshTokens', 'userRoles'] });
    if (!user) return { verified: false, user: null };
    const verified: boolean = await bcrypt.compare(password, user.passwordHash);
    return { verified, user: verified ? user : null };
  }

  addUserToRoleInContext(userId: number, contextId: string, ...roleKeys: RoleKey[]) {
    return Promise.all(
      roleKeys.map(async (key) => {
        const role = await this.rolesRepository.findOne({ key });
        const userRole = new UserRole();
        userRole.userId = userId;
        userRole.contextId = contextId;
        userRole.role = role;
        await this.userRolesRepository.save(userRole);
      }),
    );
  }

  addUserToRootRole(userId: number, ...roleKeys: RoleKey[]) {
    return this.addUserToRoleInContext(userId, 'root', ...roleKeys);
  }

  // if multiple roles are passed then will return true if user has any of the listed roles.
  async hasRoleInContext(userId: number, contextId: string, ...roleKeys: RoleKey[]) {
    const userRoles = await this.userRolesRepository.find({
      where: { userId, contextId },
      relations: ['role'],
    });
    const usersRoleKeys = userRoles.map((userRole) => userRole.role.key);
    return !isEmpty(intersection(roleKeys, usersRoleKeys));
  }

  async hasRootRole(userId: number, ...roleKeys: RoleKey[]) {
    return this.hasRoleInContext(userId, 'root', ...roleKeys);
  }
}
