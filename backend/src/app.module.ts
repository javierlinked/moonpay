import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeController } from './exchange/exchange.controller';
import { ExchangeService } from './exchange/exchange.service';

@Module({
  imports: [],
  controllers: [AppController, ExchangeController],
  providers: [AppService, ExchangeService],
})
export class AppModule {}
