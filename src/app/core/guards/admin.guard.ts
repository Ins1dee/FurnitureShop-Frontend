import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionsService } from '../../shared/services/permissions.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).hasAdminPermission();
};
