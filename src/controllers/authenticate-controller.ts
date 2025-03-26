import { Body, Controller, Post, UsePipes} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.services';
import { z } from 'zod';


const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>


@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private jwt:  JwtService,
    private prisma:  PrismaService,
) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {

    const { email, password } = authenticateBodySchema.parse(body)

    const user = await this.prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error('User not found')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
        throw new Error('Invalid password')
    }

    const acesstoken = this.jwt.sign({ userId: user.id })

    return {
        token: acesstoken
    }
   

}
}