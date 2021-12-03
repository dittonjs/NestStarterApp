import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SKIP_KEY } from 'server/decorators/skip.decorator';
import { Class } from 'server/dto/class.dto';

@Injectable()
export class GuardUtil {
  constructor(private reflector: Reflector) {}

  public shouldSkip(guard: CanActivate, context: ExecutionContext) {
    const skippedGuards = this.reflector.getAllAndOverride<Class<CanActivate>[]>(SKIP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return !!(skippedGuards && skippedGuards.find((SkippedGuard) => guard instanceof SkippedGuard));
  }
}
