import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  getHello(param: string) {
    return { message: 'Hello World! ' + param };
  }
}
