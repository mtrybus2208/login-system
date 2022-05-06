import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const appServiceMock = {
  register: jest.fn(),
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    console.log(appController)
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
    // it('should return "Hello World!"', () => {
    //   expect(appController.getHello()).toBe('Hello World!');
    // });
  });
});
