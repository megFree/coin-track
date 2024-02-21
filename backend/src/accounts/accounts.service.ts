import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { AccountDto } from './dto/accounts.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async getAccountsForUser(id: number) {
    return this.accountsRepository.find({
      where: {
        user: id,
      },
    });
  }

  async createAccount(accountDto: AccountDto) {
    const userAccounts = await this.getAccountsForUser(accountDto.user);
    const newAccountUin = userAccounts.length;
    return this.accountsRepository.save({
      title: accountDto.title,
      amount: accountDto.amount,
      currency: accountDto.currency,
      user: accountDto.user,
      uin: newAccountUin,
    });
  }

  deleteAccount(id: number) {
    return this.accountsRepository.delete({
      id,
    });
  }

  updateAccount(accountDto: AccountDto) {
    return this.accountsRepository.save(accountDto);
  }
}
