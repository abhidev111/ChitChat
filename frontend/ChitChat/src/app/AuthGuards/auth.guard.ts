import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatserviceService } from '../services/chatservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private chatservice:ChatserviceService , private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if(!this.chatservice.isLoggedIn()){
        this.router.navigateByUrl('/signin');
        this.chatservice.deleteToken();
        return false;
      }
    return true;
  }
  
}
