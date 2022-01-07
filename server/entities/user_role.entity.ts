import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  userId: number;

  @Column()
  contextId: string;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;
}
