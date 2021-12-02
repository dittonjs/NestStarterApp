import { CanActivate, SetMetadata } from '@nestjs/common';
import { Class } from 'server/dto/class.dto';

export const SKIP_KEY = 'skip';
export const Skip = (...guards: Class<CanActivate>[]) => SetMetadata(SKIP_KEY, guards);
