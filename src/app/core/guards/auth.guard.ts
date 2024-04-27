import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionsService } from '../../shared/services/permissions.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).isAuthorized();
};
