import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { UserModel } from './user-dashboard.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  formValue!:FormGroup;
  userModelObj: UserModel=new UserModel();
  userData!:any;
  showAddButton:boolean=true;
  showUpdateButton:boolean=true;
  currentRowId:string='';

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {

    this.getAllUsers();
    console.log(this.userData);
    
    this.formValue =this.formBuilder.group({
      
      name:[''],
      email:[''],
      password:[''],
      isAdmin:['']
    });

  }

  postUserSignUp(){
    this.userModelObj.name=this.formValue.value.name;
    this.userModelObj.email=this.formValue.value.email;
    this.userModelObj.isAdmin=this.formValue.value.isAdmin||false;
    this.userModelObj.password=this.formValue.value.password;

    this.api.postUser(this.userModelObj).subscribe(res=>{
      console.log(res);
      alert('added user!')
      this.formValue.reset();
      let refClose=document.getElementById('close');
      refClose?.click();
      this.getAllUsers();
    },(err)=>{
      alert('error');
    })
  }
  /**
   * 
   */
  getAllUsers(){
    this.api.getAllUsers().subscribe(res=>{
      this.userData=res;
    })
  }

  /**
   * 
   * @param row 
   */
  deleteUser(row:any){
    console.log(row);
    this.api.deleteUser(row.id).subscribe(res=>{
      alert('deleted');
      this.getAllUsers();
    });
  }

  onEdit(row:any){
    //console.log(row);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    //this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['isAdmin'].setValue(row.isAdmin);
    //this.formValue.controls['password'].setValue(row.password);
   // this.updateUser(row);
   this.currentRowId=row.id;
   this.showAddButton=false;
    this.showUpdateButton=true;

  }

  onAddUserClick(){
    
    this.formValue.reset();
    this.showAddButton=true;
    this.showUpdateButton=false;
  }


  updateUser(){
    
    this.userModelObj.name=this.formValue.value.name;
    this.userModelObj.email=this.formValue.value.email;
    this.userModelObj.isAdmin=this.formValue.value.isAdmin||false;
    let id=this.formValue.value.id;
    console.log("user model is :",this.userModelObj);

    this.api.updateUser(this.userModelObj,this.currentRowId).subscribe(res=>{
      console.log(res);
      alert('updated user!')
      this.formValue.reset();
      let refClose=document.getElementById('close');
      refClose?.click();
      this.getAllUsers();
    },(err)=>{
      alert('error');
    })
  }



}
