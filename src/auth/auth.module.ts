import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configuração correta do Passport
    JwtModule.register({
      // Opção 1: Para RS256 (RSA - recomendado usar variáveis de ambiente)
      privateKey: (process.env.JWT_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'), // Para quebras de linha no .env
      publicKey: (process.env.JWT_PUBLIC_KEY ?? '').replace(/\\n/g, '\n'),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1d' // Adicione tempo de expiração
      },
      
      
    })
  ],
  providers: [JwtStrategy], // Adicione o JwtModule como provider
  exports: [JwtModule, PassportModule] // Exporte os módulos para uso em outros lugares
})
export class AuthModule {}