import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { CurrencyModule } from 'src/currencies/currencies.module';

@Module({
  imports: [AuthModule, UsersModule, AccountsModule, CurrencyModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
