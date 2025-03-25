import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService 
extends PrismaClient
 implements
 OnModuleInit,
 OnModuleDestroy 
 {
  public client: PrismaClient | undefined;

    constructor() {
        super({
            log: [  'warn', 'error'],
        });
        
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

}