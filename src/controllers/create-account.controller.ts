import { Controller, Post, Body, Get, Delete, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';


@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma:  PrismaService) {}

  @Post()
  async handle(@Body() body: { name: string, email: string, password: string }) {
    const { name, email, password } = body


    const userWithSameEmail = await this.prisma.user.findUnique({
        where: {
            email
        }
        })

        if (userWithSameEmail) {
            throw new ConflictException('Email already exists')
        }





    await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
}
    @Get()
    async list() {
        return await this.prisma.user.findMany()
    }

    

}