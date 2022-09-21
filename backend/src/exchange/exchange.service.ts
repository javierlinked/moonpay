import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class ExchangeService {
  exchanges: Record<string, string>;

  constructor() {
    this.exchanges = {
      coinbase:
        'https://api.exchange.coinbase.com/products/btc-usd/book?level=2',
      binance: 'https://api3.binance.com/api/v3/depth?symbol=BTCUSDT&limit=100',
      kraken: 'https://api.kraken.com/0/public/Depth?pair=btcusd',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCandidateExchange(amount: number): Promise<any> {
    // retrieve books from exchanges
    const books = await this.getBooks();
    const avg = this.calculateAveragePrice(books, amount);
    console.log(avg);
    // calculate average price
    // return exchange with lowest price
    // return this.books;

    return {
      btcAmount: amount,
      usdAmount: 10000,
      exchange: 'coinbase',
    };
  }

  async getBooks(): Promise<Record<string, []>> {
    const result: Record<string, []> = {};
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

  /**
   * For each exchange we loop through the "asks" table and we "purchase" bitcoin until the accumulated one is more than
   * the amount required to buy. Then we find the average price for these orders.
   *
   * @param amount
   * @returns {*[]}
   */
  calculateAveragePrice(
    books: Record<string, []>,
    amount: number,
  ): Record<string, number> {
    const avgBuyPrices: Record<string, number> = {};
    for (const key in books) {
      let btcAccumulated = 0.0;
      let usdAvgPrice = 0.0;

      for (let asksLooper = 0; asksLooper < books[key].length; asksLooper++) {
        const price = parseFloat(books[key][asksLooper][0]);
        const amountSelling = parseFloat(books[key][asksLooper][1]);

        if (btcAccumulated >= amount) {
          avgBuyPrices[key] = usdAvgPrice / asksLooper;
          break;
        }

        btcAccumulated += amountSelling;
        usdAvgPrice += price;
      }
    }

    return avgBuyPrices;
  }

  calculateAveragePrice1(
    books: Record<string, []>,
    amount: number,
  ): Record<string, number> {
    const result: Record<string, number> = {};

    for (const key in books) {
      let btcAmount = 0;
      let usdAmount = 0;
      let i = 0;
      while (btcAmount < amount) {
        const order = books[key][i]; // [price, amount]
        const orderBtcAmount = parseFloat(order[1]); // amount
        const orderUsdAmount = parseFloat(order[0]) * orderBtcAmount; // price * amount
        btcAmount += orderBtcAmount; // accumulate btc amount
        usdAmount += orderUsdAmount; // accumulate usd amount
        i++;
      }
      result[key] = usdAmount / btcAmount; // average price
    }
    return result;
  }

  calculateAveragePrice2(
    books: Record<string, []>,
    amount: number,
  ): Record<string, number> {
    const result: Record<string, number> = {};

    for (const key in books) {
      let btcAmount = 0;
      let usdAmount = 0;
      let i = 0;
      while (btcAmount < amount) {
        const order = books[key][i]; // [price, amount]
        const orderBtcAmount = parseFloat(order[1]); // amount
        const orderUsdAmount = parseFloat(order[0]) * orderBtcAmount; // price * amount
        btcAmount += orderBtcAmount; // accumulate btc amount
        usdAmount += orderUsdAmount; // accumulate usd amount
        i++;
      }
      result[key] = usdAmount / btcAmount; // average price
    }

    return result;
  }
}
