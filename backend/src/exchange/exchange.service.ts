import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class ExchangeService {
  exchanges: Record<string, string>;
  books: [];

  constructor() {
    this.exchanges = {
      coinbase:
        'https://api.exchange.coinbase.com/products/btc-usd/book?level=2',
      binance: 'https://api3.binance.com/api/v3/depth?symbol=BTCUSDT&limit=50',
      kraken: 'https://api.kraken.com/0/public/Depth?pair=btcusd',
    };
    this.books = [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCandidateExchange(amount: number): Promise<any> {
    // retrieve books from exchanges
    this.books = await this.getBooks();
    // calculate average price
    // return exchange with lowest price
    // return this.books;

    return {
      btcAmount: amount,
      usdAmount: 10000,
      exchange: 'coinbase',
    };
  }

  async getBooks(): Promise<any> {
    const result = [];
    for (const key in this.exchanges) {
      const response = await fetch(this.exchanges[key]);
      const jsonResult = await response.json();

      if (key === 'kraken') {
        result[key] = jsonResult.result.XXBTZUSD.asks;
      } else {
        result[key] = jsonResult.asks;
      }
    }
    return result;
  }
}
