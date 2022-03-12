import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLMeals='http://localhost:3000/api/v1/'+'meals/';
  constructor(private http: HttpClient) {

   }

  login(email:string,password:string){
    return this.http.post<any>('http://localhost:3000/api/v1/users/login',{email:email,password:password})
  }
}
