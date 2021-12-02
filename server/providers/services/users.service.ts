import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,
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
}
