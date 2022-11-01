import { RoleKey } from '@prisma/client';

export interface JwtBodyDto {
  userId: number;
  roles: RoleKey[];
}
