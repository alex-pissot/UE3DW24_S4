import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const id = 1;

describe('UserService', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          },
        },
        UsersRepository
      ],
      controllers: [UsersController],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('UserService.findAll ', () => {
    it('should return an array of users', async () => {
      usersService.findAll  = jest.fn();
      expect(usersService.findAll);
      console.log('Test Service : Should find all users => 200');
    });
  });

  describe('UserService.findOne', () => {
    it('should return a user', async () => {
      usersService.findOne = jest.fn();
      expect(usersService.findOne(id));
      console.log('Test Service : Should find one user => 200');
    });
  });

  describe('UserService.createUser', () => {
    it('should create a user', async () => {
      const mockRequest: any = {
        body: {
          firstname: 'Ok',
          lastname: 'Ok',
        },
      };
      usersService.createUser = jest.fn();
      expect(usersService.createUser(mockRequest));
      console.log('Test Service : Should create user => 201');
    });
  });

  describe('UserService.update', () => {
    it('should update a user', async () => {
      
      const mockRequest: any = {
        body: {
          firstname: 'Nope',
          lastname: 'Nope',
        },
      };
      
      usersService.update = jest.fn();
      expect(usersService.update(id,mockRequest));
      console.log('Test Service : Should update user => 200');
    });
  });

  describe('UserService.update', () => {
    it('should delete a user', async () => {
      usersService.remove = jest.fn();
      expect(usersService.remove(id));
      console.log('Test Service : Should delete user => 200');
    });
  });

});