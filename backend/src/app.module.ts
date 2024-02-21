import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { User } from './users/entities/user.entity';
import { Account } from './accounts/entities/account.entity';
import { Currency } from './currencies/entities/currency.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_TOKEN_EXPIRED_IN } from './_utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'cointrack',
      entities: [User, Account, Currency],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_TOKEN_EXPIRED_IN,
      },
    }),
    ApiModule,
  ],
})
export class AppModule {}
