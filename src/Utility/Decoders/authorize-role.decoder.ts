import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AuthorizeRoles = (...roles: string[]) => SetMetadata('allowedRoles', roles);