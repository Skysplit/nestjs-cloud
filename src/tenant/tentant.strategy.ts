import {
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';

// 1 -> contextId1
// 2 -> contextId2
// X -> {randomContextId}
const tenantContextIdsMap = new Map<string, ContextId>();

export class TenantStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers['x-tenant-id'] as string;
    let tenantContextId: ContextId;

    if (tenantContextIdsMap.has(tenantId)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tenantContextId = tenantContextIdsMap.get(tenantId)!;
    } else {
      tenantContextId = ContextIdFactory.create();
      tenantContextIdsMap.set(tenantId, tenantContextId);
    }

    return (info: HostComponentInfo) =>
      info.isTreeDurable ? tenantContextId : contextId;
  }
}
