import 'server/env';
import { UsersController } from './users.controller';
import { UsersService } from 'server/providers/services/users.service';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from 'server/providers/services/roles.service';
import { Response } from 'express';
import { User } from 'server/entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  const res = { cookie: () => {} };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: RefreshTokensService,
          useValue: {
            create: async (refreshToken) => refreshToken,
          },
        },
        {
          provide: UsersService,
          useValue: {
            findAll: async () => [{ id: 1 }],
            create: async (user: User) => user,
          },
        },
        {
          provide: RolesService,
          useValue: {
            findByKey: (key) => [{ key, id: 1 }],
          },
        },
        JwtService,
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe('index', () => {
    it('should get all users', async () => {
      expect(await usersController.index()).toEqual({ users: [{ id: 1 }] });
    });
  });

  describe('create', () => {
    it('should create a user with email and password', async () => {
      const { token, user } = await usersController.create(
        { firstName: 'firstName', lastName: 'lastName', email: 'test@test.com', password: 'test' },
        res as unknown as Response<any>,
      );
      expect(token.length).toBeGreaterThan(0);
      expect(user.email).toEqual('test@test.com');
      expect(user.firstName).toEqual('firstName');
      expect(user.lastName).toEqual('lastName');
      expect(user.passwordHash.length).toBeGreaterThan(0);
      expect(user.passwordHash).not.toEqual('test');
      expect(user.userRoles).toHaveLength(1);
      expect(user.userRoles[0].role.key).toEqual('user');
    });
  });
});
