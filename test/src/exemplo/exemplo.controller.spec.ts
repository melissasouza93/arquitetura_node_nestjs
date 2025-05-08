import { Test, TestingModule } from '@nestjs/testing';
import { ExemploController } from '../../../src/exemplo/exemplo.controller';
import { ExemploService } from 'src/exemplo/exemplo.service';

describe('ExemploController', () => {
  let controller: ExemploController;
  let service: ExemploService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExemploController],
      providers: [
        {
          provide: ExemploService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExemploController>(ExemploController);
    service = module.get<ExemploService>(ExemploService);
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
