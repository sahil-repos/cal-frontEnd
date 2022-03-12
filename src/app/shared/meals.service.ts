import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }

  /**
    * 
    * @returns 
    */
   getAllMeals(){
    return this.http.get<any>("http://localhost:3000/api/v1/meals/").pipe(
      map((res:any)=>{
       // console.log(res);
        return res;
      })
    )
   }
}
