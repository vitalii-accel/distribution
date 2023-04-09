import { Body, Controller, Post } from '@nestjs/common';
import { DistributionService } from './distribution.service';
import { LeadDistribution } from '../interfaces/lead-distribution';
import { AccountDistribution } from '../interfaces/account-distribution';

@Controller('distribution')
export class DistributionController {
  constructor(private distributionService: DistributionService) {}
  @Post()
  async distribution(
    @Body('leads') leads: { add: LeadDistribution[] },
    @Body('account') account: AccountDistribution,
  ) {
    await this.distributionService.distribution(account, leads.add);
  }
}
