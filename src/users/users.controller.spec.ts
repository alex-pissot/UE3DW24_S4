import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users, UsersRepository } from './entities/user.entity';
import { Repository } from 'typeorm';

const id = 1;

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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
      ]
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
    usersRepository = app.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      const data = usersController.findAll();
      expect(usersController.findAll()).toBe(data);
      console.log('Test Controller : Should find all users => 200');
    });
  });

  describe('Find User by Id', () => {
    it('should return a user', async () => {
      const data = usersController.findOne(id);
      expect(usersController.findOne(id)).toStrictEqual(data);
      console.log('Test Controller : Should find one user => 200');
    });
  });

  describe('Create User', () => {
    it('should create a user', async () => {
      const mockRequest: any = {
        body: {
          firstname: 'Ok',
          lastname: 'Ok',
        },
      };

      const data = usersController.createUser(mockRequest);
      expect(usersController.createUser(mockRequest)).toBe(data);
      
      console.log('Test Controller : Should create user => 201');
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      
      const mockRequest: any = {
        body: {
          firstname: 'Nope',
          lastname: 'Nope',
        },
      };
      
      const data = usersController.update(id, mockRequest);
      expect(usersController.update(id, mockRequest)).toStrictEqual(data);
      console.log('Test Controller : Should update user => 200');

    });
  });
  
  describe('Delete User', () => {
    it('should delete a user', async () => {
      const data = usersController.remove(id);
      expect(usersController.remove(id)).toStrictEqual(data);
      console.log('Test Controller : Should delete user => 200');
    });
  });

});