import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;

  const users: User[] = [];

  beforeEach(async () => {
    // create a fake user service
    mockUsersService = {
      find: (email: string) =>
        Promise.resolve(users.filter((user) => user.email === email)),
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 1000),
          email,
          password,
        };

        users.push(user as User);

        return Promise.resolve(user as User);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should be defined', async () => {
    expect(authService).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await authService.signup('test@test.com', 'diekdii');

    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('diekdii');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email in use', async () => {
    await authService.signup('testq@test.com', 'diekdii');

    await expect(
      authService.signup('testq@test.com', 'diekdii'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      authService.signin('test1@test.com', 'diekdii'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws an error if an invalid argument is provided', async () => {
    await authService.signup('test111@test.com', 'diekdii');

    await expect(
      authService.signin('test111@test.com', 'kdii'),
    ).rejects.toThrow(BadRequestException);
  });

  it('should signin the user', async () => {
    await authService.signup('test3@test.com', 'diekdii');
    const user = await authService.signin('test3@test.com', 'diekdii');

    expect(user.email).toBe('test3@test.com');
  });
});
