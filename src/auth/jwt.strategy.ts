import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "src/env";
import { z } from "zod";

const tokenSchema = z.object({
    sub: z.string().uuid(),
})
type TokenSchema = z.infer<typeof tokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });
    
  

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: publicKey, // ← Usar diretamente a string PEM
      algorithms: ['RS256'],
      ignoreExpiration: false, // Mantenha false em produção
    });
  }

  async validate(payload: any) {
   
    return { userId: payload.sub };
  }
}