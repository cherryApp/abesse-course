import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private ar: ActivatedRoute,
  ) { }

  canActivate(ar: ActivatedRouteSnapshot): boolean {
    const user = this.auth.currentUserSubject.value;
    if (ar.data && ar.data.expectedRole) {
      const access = user && user.role >= ar.data.expectedRole;
      if (!access) {
        this.router.navigate(['forbidden']);
      }
      return access;
    }
    return false;
  }
}
