import { forwardRef, Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
// import { Account } from './account.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    // TypeOrmModule.forFeature([Account])
  ],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
