import { SetMetadata } from '@nestjs/common';
import { RoleKey } from 'server/entities/role.entity';

export const ROLES_CONTEXT_KEY = 'roles';
export const Roles = (...roles: RoleKey[]) => SetMetadata(ROLES_CONTEXT_KEY, roles);
