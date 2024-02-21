import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Req,
  UseGuards,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { Helper, JWT_TOKEN_COOKIE_NAME } from 'src/_utils';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignInDto, SignUpDto } from './dto/api.dto';
import { AccountDto } from 'src/accounts/dto/accounts.dto';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const result = await this.apiService.register(signUpDto);
    response.cookie(JWT_TOKEN_COOKIE_NAME, result.jwt.access_token, {
      httpOnly: true,
      secure: true,
      expires: new Date(result.jwt.expired_at),
    });
    const { jwt, ...user } = result;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const result = await this.apiService.login(signInDto);
    response.cookie(JWT_TOKEN_COOKIE_NAME, result.jwt.access_token, {
      httpOnly: true,
      secure: true,
      expires: new Date(result.jwt.expired_at),
    });
    const { jwt, ...user } = result;
    return user;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req: ExpressRequest) {
    const token = Helper.ExtractHtmlCookieFromHeader(req, JWT_TOKEN_COOKIE_NAME);
    return this.apiService.getCurrentUser(token);
  }

  @Get('accounts')
  @UseGuards(AuthGuard)
  getAccounts(@Req() req) {
    const token = Helper.ExtractHtmlCookieFromHeader(req, JWT_TOKEN_COOKIE_NAME);
    return this.apiService.getAccounts(token);
  }

  @Get('currencies')
  getCurrencies() {
    return this.apiService.getCurrencies();
  }

  @Post('createAccount')
  @UseGuards(AuthGuard)
  createAccount(@Body() accountDto: AccountDto, @Req() req) {
    const token = Helper.ExtractHtmlCookieFromHeader(req, JWT_TOKEN_COOKIE_NAME);
    return this.apiService.createAccount(token, accountDto);
  }

  @Post('deleteAccount')
  @UseGuards(AuthGuard)
  deleteAccount(@Body() body: { id?: number }, @Req() req) {
    if (!body.id) {
      throw new UnprocessableEntityException(`No account id in request body`);
    }
    const token = Helper.ExtractHtmlCookieFromHeader(req, JWT_TOKEN_COOKIE_NAME);
    return this.apiService.deleteAccount(token, body.id);
  }

  @Post('updateAccount')
  @UseGuards(AuthGuard)
  updateAccount(@Body() account: AccountDto, @Req() req) {
    if (!account.id) {
      throw new UnprocessableEntityException(`No account id in request body`);
    }
    const token = Helper.ExtractHtmlCookieFromHeader(req, JWT_TOKEN_COOKIE_NAME);
    return this.apiService.updateAccount(token, account);
  }
}
