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
    ],
  };
  //   exchange1: [
  //     [0.5, 1],
  //     [0.3, 2],
  //   ],
  //   exchange2: [
  //     [1, 1],
  //     [1.5, 2],
  //   ],
  //   exchange3: [
  //     [1, 1],
  //     [4, 2],
  //   ],
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.only('should calculate average price in books', () => {
    const res = service.calculateAveragePrice2(books, 2);
    const expected = {
      exchange1: 23.333333333333332,
      exchange2: 2.3333333333333335,
      exchange3: 233.33333333333334,
    };
    expect(res).toEqual(expected);
  });
});
