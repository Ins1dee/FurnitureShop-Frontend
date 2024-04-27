import { CanActivateFn } from '@angular/router';
import { PermissionsService } from '../../shared/services/permissions.service';
import { inject } from '@angular/core';

export const sellerGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).hasSellerPermission();
};
