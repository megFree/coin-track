import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto, SignUpDto } from './dto/api.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { AccountDto } from 'src/accounts/dto/accounts.dto';

/**
 * Фасад для остальных сервисов
 */
@Injectable()
export class ApiService {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private accountsService: AccountsService,
    private currencySerivce: CurrenciesService,
  ) {}

  login(signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  async getCurrentUser(token: string) {
    const jwtPayload = this.jwtService.decode(token);
    const currentUser = await this.usersService.findOne(jwtPayload.username);
    const { password, ...user } = currentUser;
    return user;
  }

  register(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  getAccounts(token: string) {
    const { sub } = this.jwtService.decode(token);
    return this.accountsService.getAccountsForUser(sub);
  }

  async getCurrencies() {
    const currencies = await this.currencySerivce.getCurrencies();
    return currencies.map((currency) => currency.name);
  }

  createAccount(token: string, accountDto: AccountDto) {
    const { sub } = this.jwtService.decode(token);
    return this.accountsService.createAccount({
      user: sub,
      title: accountDto.title,
      amount: accountDto.amount,
      currency: accountDto.currency,
    });
  }

  async deleteAccount(token: string, id: number) {
    const { sub } = this.jwtService.decode(token);
    const account = (await this.accountsService.getAccountsForUser(sub)).find(
      (account) => Number(account.id) === Number(id),
    );
    if (!account) {
      throw new UnprocessableEntityException(`Can't find account for user`);
    }
    return this.accountsService.deleteAccount(account.id);
  }

  async updateAccount(token: string, account: AccountDto) {
    const { sub } = this.jwtService.decode(token);
    const userAccount = (
      await this.accountsService.getAccountsForUser(sub)
    ).find((item) => item.id === account.id);
    if (!userAccount) {
      throw new UnprocessableEntityException(`Can't find account for user`);
    }
    return this.accountsService.updateAccount({
      ...userAccount,
      ...account,
    });
  }
}
