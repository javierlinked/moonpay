import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange/exchange.controller';
import { ExchangeService } from './exchange/exchange.service';

@Module({
  imports: [],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class AppModule {}
