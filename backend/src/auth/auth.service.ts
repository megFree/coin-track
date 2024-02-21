import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_EXPIRED_IN } from 'src/_utils';
import ms from 'ms';
import { format } from 'date-fns';
import { SignUpDto } from 'src/api/dto/api.dto';
import { UserDto } from 'src/users/dto/users.dto';
import { AuthenticationResultDto } from './dto/auth.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly SALTS_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async getAuthenticationResult(
    user: UserDto,
  ): Promise<AuthenticationResultDto> {
    const username = user.username;

    const expired_at =
      Number(format(new Date(), 'T')) + Number(ms(JWT_TOKEN_EXPIRED_IN));

    const jwtPayload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(jwtPayload);

    return {
      id: user.id,
      username,
      jwt: {
        access_token,
        expired_at,
      },
    };
  }

  async signIn(usernameArg: string, pass: string) {
    const user = await this.usersService.findOne(usernameArg);
    if (await bcrypt.compare(pass, user.password)) {
      /* 
        @todo: подумать над тем, какие коды ошибок возвращать, 
        чтобы на фронте решать, какие текста и сообщения показывать
      */
      throw new UnauthorizedException();
    }
    return this.getAuthenticationResult(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const params: SignUpDto = {
      username: signUpDto.username,
      password: await bcrypt.hash(signUpDto.password, this.SALTS_ROUNDS),
    };
    const user = await this.usersService.createUser(params);
    return this.getAuthenticationResult(user);
  }
}
