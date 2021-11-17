import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,
  ) {}

  findBy(options: Record<string, any>) {
    return this.usersRespository.findOne(options);
  }

  find(id: number) {
    return this.usersRespository.findOne(id);
  }

  async verify(email: string, password: string) {
    const user = await this.usersRespository.findOne({ email });
    if (!user) return false;
    return bcrypt.compare(password, user.password_hash);
  }
}
