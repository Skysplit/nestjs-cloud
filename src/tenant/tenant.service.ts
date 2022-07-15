import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { Tenant } from './tenant.entity';

@Injectable({ scope: Scope.REQUEST, durable: false })
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log({ request });
    console.log('Tenant service created');
  }

  async findCurrent() {
    const tenantId = this.request.headers['x-tenant-id'] as string | undefined;

    if (!tenantId) {
      throw new BadRequestException('Missing tenant id');
    }

    const tenant = await this.tenantRepository.findOneBy({ id: +tenantId });

    if (!tenant) {
      throw new BadRequestException('Incorrect tenant id');
    }

    return tenant;
  }
}
