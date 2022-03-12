import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setToken(data:any){
    localStorage.setItem('token',data.token);
  }

  getItem(key:string){
    return localStorage.getItem(key);
  }
  removeItem(){
    localStorage.removeItem('token');
  }
}
