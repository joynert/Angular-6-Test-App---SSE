import { UserService } from "src/app/shared/services/user.service";
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router,
       
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.userService.getUserLoggedIn() != undefined) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
