import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!:FormGroup;
  constructor(private formBuidler:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuidler.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  signUp(){
    let obj=this.signupForm.value;
    this.http.post<any>("http://localhost:3000/api/v1/users/signup",obj).subscribe(
      res=>{
        alert("signUp success!");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err=>{
        alert("soemthing went wrong")
      }
    );
  }

}
