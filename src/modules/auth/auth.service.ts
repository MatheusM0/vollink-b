import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username) as unknown as { password?: string; [key: string]: any } | null;
    if (user?.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 🔥 Closure para geração do token JWT
  generateToken = (user: any) => {
    return (() => {
      const payload = { username: user.username, sub: user.id };
      return this.jwtService.sign(payload);
    })();
  };

  async login(user: any) {
    return {
      access_token: this.generateToken(user),
    };
  }
}
