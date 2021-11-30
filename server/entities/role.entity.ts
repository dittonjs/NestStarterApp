import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { UserRole } from './user_role.entity';

@Entity()
export class Role {
  static ADMIN = 'admin';
  static USER = 'user';

  // make sure add additional roles to this arraylist as it
  // will be used during seeds to initiallize all roles.
  static ROLES = [Role.ADMIN, Role.USER];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
