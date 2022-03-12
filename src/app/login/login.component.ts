import { HttpClient } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {Validator, FormBuilder,FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LocalstorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  authError:boolean=false;
  isSubmitted:boolean=false;
  constructor( private formBuilder: FormBuilder, private http:HttpClient, private router: Router, private authService:AuthService, private localStorageService:LocalstorageService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group(
      {
        email:['',Validators.required],
        password:['',Validators.required]
      }
    )
  }

  login(){
    let obj=this.loginForm.value;
    this.isSubmitted=true;
    this.authService.login(obj.email,obj.password).subscribe(user=>{
      this.authError=false;
      this.localStorageService.setToken(user);
      this.router.navigate(['meals']);
    },(error)=>{
      console.log(error);
      this.authError=true;
    });
    
    // this.http.post<any>("http://localhost:3000/api/v1/users/login",obj).subscribe(
    //   res=>{
    //     alert("Login success!");
    //     //this.loginForm.reset();
    //     this.router.navigate(['dashboard']);
    //   },err=>{
    //     alert(err)
    //   }
    // );
  }

}
