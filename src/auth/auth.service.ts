import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(user: JwtPayload) {
    return await this.userService.forExternalId(user.sub as string);
  }
}
