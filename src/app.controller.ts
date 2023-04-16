import { All, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  getHello(): string {
    console.log('getHello');
    return this.appService.getHello();
  }
}
