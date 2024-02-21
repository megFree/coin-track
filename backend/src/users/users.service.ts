import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/users.dto';
import { SignUpDto } from 'src/api/dto/api.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async createUser(signUpDto: SignUpDto) {
    try {
      const user = await this.userRepository.save(signUpDto);
      return user;
    } catch (e) {
      throw new UnprocessableEntityException(
        'Пользователь с таким никнеймом уже есть.',
      );
    }
  }
}
