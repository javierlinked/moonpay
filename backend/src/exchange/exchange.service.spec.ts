import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  const books: Record<string, any> = {
    exchange1: [
      [10, 1],
      [20, 2],
      [30, 3],
    ],
    exchange2: [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    exchange3: [
      [100, 1],
      [200, 2],
      [300, 3],
      [400, 4],
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate average price in books', () => {
    const res = service.getAveragePerExchange(books, 3);
    const expected = {
      exchange1: 15,
      exchange2: 1.5,
      exchange3: 150,
    };
    expect(res).toEqual(expected);
  });
});
