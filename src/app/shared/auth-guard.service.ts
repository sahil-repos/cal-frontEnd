import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAdmin:boolean=false;
  currentUser:string='';
  constructor(private router: Router, private localStorageService:LocalstorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token=this.localStorageService.getItem('token');
    if(token){
      //token's 2nd part carries our data
      const decodedToken= JSON.parse( atob(token.split('.')[1]) );
      if(decodedToken.isAdmin && !this._tokenExpired(decodedToken.exp)){
        this.isAdmin=true;
      }
      return true;
    } 

    this.router.navigate(['login']);

    return false;
  }

  private _tokenExpired(expiration:any):boolean{
    return Math.floor(new Date().getTime()/1000)>=expiration;
  }
}
