import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {
    
   }
   /**
    * signUp
    * @param data 
    * @returns 
    */
   postUser(data:any){
     return this.http.post<any>("http://localhost:3000/api/v1/users/",data).pipe(
       map((res:any)=>{
         console.log(res);
         return res;
       })
     )
   }
   /**
    * 
    * @returns 
    */
   getAllUsers(){
    return this.http.get<any>("http://localhost:3000/api/v1/users/").pipe(
      map((res:any)=>{
       // console.log(res);
        return res;
      })
    )
   }

   deleteUser(id:string){
     return this.http.delete<any>("http://localhost:3000/api/v1/users/"+id).pipe(
       map((res:any)=>{
         console.log('del ka res'+res);
         return res;
       })
     )
   }

   updateUser(data:any,id:any){
     return this.http.put<any>("http://localhost:3000/api/v1/users/"+id,data).pipe(
       map((res:any)=>{
         return res;
       }
     )
     )
   }
}
