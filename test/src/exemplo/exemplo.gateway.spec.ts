import { Test, TestingModule } from '@nestjs/testing';
import { ExemploGateway } from '../../../src/exemplo/exemplo.gateway';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('ExemploGateway', () => {
  let gateway: ExemploGateway;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExemploGateway,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<ExemploGateway>(ExemploGateway);
    httpService = module.get<HttpService>(HttpService);
  });

  it('Deve estar definido', () => {
    expect(gateway).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
