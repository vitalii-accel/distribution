import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { AccountDistribution } from '../interfaces/account-distribution';
import { LeadDistribution } from '../interfaces/lead-distribution';

@Injectable()
export class DistributionService {
  private managers = [9204711, 9413975];
  // private managers = [9413975];
  private selectedIndex = 0;

  constructor(private accountService: AccountsService) {}

  // async distribution(account: AccountDistribution, leads: LeadDistribution[]) {
  //   const api = this.accountService.createConnector(Number(account.id));
  //   const { data: result } = await api.patch(`/api/v4/leads/${leads[0].id}`, {
  //     responsible_user_id: this.getManagerId(),
  //   });
  //   return result;
  // }
  //
  // private getManagerId() {
  //   const managersLength = this.managers.length;
  //   const currentIndex = this.selectedIndex + 1;
  //   if (currentIndex >= managersLength) {
  //     this.selectedIndex = 0;
  //     return this.managers[0];
  //   }
  //   this.selectedIndex = currentIndex;
  //   return this.managers[currentIndex];
  // }
}
