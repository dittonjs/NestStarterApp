import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from 'server/entities/refresh_token.entity';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRespository: Repository<RefreshToken>,
  ) {}

  create(refreshToken: RefreshToken) {
    return this.refreshTokenRespository.save(refreshToken);
  }

  destroy(...refreshTokens: RefreshToken[]) {
    return this.refreshTokenRespository.remove(refreshTokens);
  }
}
