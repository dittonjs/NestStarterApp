import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'server/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('index', () => {
    it('should run without crashing', () => {
      expect(appController.index()).toBeUndefined();
    });
  });
});
