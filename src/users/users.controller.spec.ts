import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      // signin: (email: string, password: string) => {},
      // signup: (email: string, password: string) => {},
    };

    mockUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'dkfd@kfi.com',
          password: 'diefh',
        } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: 'kdijdkf' } as User]),
      // remove: () => {},
      // update: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asd@gkdi.com');
    const [user] = users;

    expect(users.length).toBe(1);
    expect(user.email).toBe('asd@gkdi.com');
  });

  it('findUsers returns a single user with the given id', async () => {
    const user = await controller.findUser('1');

    expect(user).toBeDefined();
  });
});
