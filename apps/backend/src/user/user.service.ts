import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { insertUserSchema, usersTable } from 'src/db/schema/users';
import { type InsertUser } from '../db/schema/users';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}
  async create(userData: InsertUser) {
    try {
      const user = insertUserSchema.parse(userData);
      return await this.drizzleService.connection
        .insert(usersTable)
        .values(user);
    } catch (err) {
      console.error('Found an error: ', err);
      return {
        error: err,
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
