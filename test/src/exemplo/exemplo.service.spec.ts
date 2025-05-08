import { Test, TestingModule } from '@nestjs/testing';
import { ExemploService } from '../../../src/exemplo/exemplo.service';
import { ExemploGateway } from 'src/exemplo/exemplo.gateway';

describe('ExemploService', () => {
  let service: ExemploService;
  let gateway: ExemploGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExemploService,
        {
          provide: ExemploGateway,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExemploService>(ExemploService);
    gateway = module.get<ExemploGateway>(ExemploGateway);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(gateway).toBeDefined();
  });
});
