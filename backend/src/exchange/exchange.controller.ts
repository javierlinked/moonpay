import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange-routing')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Get()
  getHello(@Query() query) {
    return this.exchangeService.getHello(query.amount);
  }
}
