import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange-routing')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Get()
  async getHello(@Query() query): Promise<any> {
    const amount = parseFloat(query.amount);
    return await this.exchangeService.getCandidateExchange(amount);
  }
}
