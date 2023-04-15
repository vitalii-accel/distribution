import { forwardRef, Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../Schemas/Account.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
