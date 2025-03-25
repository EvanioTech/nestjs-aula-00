import { Controller, Post, Body, Get, Delete, ConflictException, UsePipes, HttpCode } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { create } from 'domain';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.services';
import { z } from 'zod';

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma:  PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body)

    const userWithSameEmail = await this.prisma.user.findUnique({
        where: {
            email
        }
        })

        if (userWithSameEmail) {
            throw new ConflictException('Email already exists')
        }

        const passwordHash = await hash(password, 8)





    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })
}
    @Get()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async list() {
        return await this.prisma.user.findMany()
    }

    

}