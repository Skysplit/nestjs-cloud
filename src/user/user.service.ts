import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
  ) {}

  async forExternalId(externalId: User['externalId']) {
    return await this.userRepository.findOne({ externalId });
  }
}
