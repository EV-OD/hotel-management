import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
// import mysql from 'mysql2/promise';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private dbConnection: ReturnType<typeof drizzle>;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.dbConnection = drizzle(this.configService.get<string>('DATABASE_URL'));
    console.log('Database connection established.');
  }

  get connection() {
    if (!this.dbConnection) {
      throw new Error('Database connection is not initialized.');
    }
    return this.dbConnection;
  }

  async onModuleDestroy() {
    if (this.dbConnection) {
      await this.dbConnection.$client.end();
      console.log('Database connection closed.');
    }
  }
}
