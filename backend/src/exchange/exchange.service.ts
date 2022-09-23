import { Injectable, Logger } from '@nestjs/common';
import fetch, { Response } from 'node-fetch';

@Injectable()
export class ExchangeService {
  exchanges: Record<string, string>;
  log: Logger = new Logger('ExchangeService');

  constructor() {
    this.exchanges = {
      coinbase:
        'https://api.exchange.coinbase.com/products/btc-usd/book?level=2',
      binance: 'https://api3.binance.com/api/v3/depth?symbol=BTCUSDT&limit=100',
      kraken: 'https://api.kraken.com/0/public/Depth?pair=btcusd',
    };
  }

  async getCandidateExchange(amount: number): Promise<any> {
    // retrieve books from exchanges
    const books = await this.fetchBooks();
    const averages = this.getAveragePerExchange(books, amount);

    const cheaperExchange = Object.entries(averages).reduce(
      (previous, current) => {
        return current[1] < previous[1] ? current : previous;
      },
    );

    return {
      btcAmount: amount,
      usdAmount: cheaperExchange[1],
      exchange: cheaperExchange[0],
    };
  }

  /**
   * Get books from exchanges.
   * @returns A dictionary with the books from exchanges.
   */
  async fetchBooks(): Promise<Record<string, []>> {
    const result: Record<string, []> = {};
    for (const key in this.exchanges) {
      let response: Response;
      try {
        response = await fetch(this.exchanges[key]);
      } catch (error) {
        // gracefully handle error and continue
        this.log.warn(`Error fetching ${key} exchange`);
        this.log.warn(error);
        continue;
      }

      const jsonResult = await response.json();

      if (key === 'kraken') {
        result[key] = jsonResult.result.XXBTZUSD.asks;
      } else {
        result[key] = jsonResult.asks;
      }
    }
    return result;
  }

  /**
   * We loop exchanges "ask" tables and we calculate per exchange the average price for the amount of bitcoin we want to buy.
   * @param books books from exchanges
   * @param amount amount of bitcoin we want to buy
   * @returns A dictionary with the average price per exchange.
   */
  getAveragePerExchange(
    books: Record<string, []>,
    amount: number,
  ): Record<string, number> {
    const result: Record<string, number> = {};
    for (const key in books) {
      let btcAccumulated = 0.0;
      let usdAccumulated = 0.0;

      let i = 0;
      while (i < books[key].length && btcAccumulated < amount) {
        const price = parseFloat(books[key][i][0]);
        const amountBTCInOrder = parseFloat(books[key][i][1]);
        btcAccumulated += amountBTCInOrder;
        usdAccumulated += price;
        i++;
      }
      result[key] = usdAccumulated / i;
    }

    return result;
  }
}
