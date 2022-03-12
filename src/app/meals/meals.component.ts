import { Component, OnInit } from '@angular/core';
import { MealModel } from './meals.model';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MealsService } from '../shared/meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  mealformValue!:FormGroup;
  mealModelObj: MealModel=new MealModel();
  mealData!:any;
  showAddButton:boolean=true;
  showUpdateButton:boolean=true;
  currentRowId: any;
  constructor(private formBuilder:FormBuilder, private mealsService:MealsService) { }

  ngOnInit(): void {
    this.getAllMeals();
    
    this.mealformValue =this.formBuilder.group({
      
      name:['',Validators.required],
      email:[''],
      created_at:[''],
      calories:['',Validators.required]
    });
  }

  getAllMeals(){
    this.mealsService.getAllMeals().subscribe(res=>{
      this.mealData=res;
    })
  }

  //
  
  /**
   * 
   * @param row 
   */
  //  deleteMeal(row:any){
  //   console.log(row);
  //   this.mealsService.deleteMeal(row.id).subscribe(res=>{
  //     alert('deleted this meal');
  //     this.getAllMeals();
  //   });
  // }

  onEdit(row:any){
    //console.log(row);
    this.mealformValue.controls['name'].setValue(row.name);
    this.mealformValue.controls['email'].setValue(row.email);
    this.mealformValue.controls['calories'].setValue(row.calories);
    //this.formValue.controls['password'].setValue(row.password);
   // this.updateUser(row);
   this.currentRowId=row.id;
   this.showAddButton=false;
    this.showUpdateButton=true;

  }

  onAddMealClick(){
    
    this.mealformValue.reset();
    this.showAddButton=true;
    this.showUpdateButton=false;
  }


  // updateMeal(){
    
  //   this.mealModelObj.name=this.mealformValue.value.name;
  //   this.mealModelObj.email=this.mealformValue.value.email;
  //   this.mealModelObj.calories=this.mealformValue.value.calories||0;
  //   let id=this.mealformValue.value.id;
  //   console.log("user model is :",this.mealModelObj);

  //   this.mealsService.updateMeal(this.mealModelObj,this.currentRowId).subscribe(res=>{
  //     console.log(res);
  //     alert('updated meal!')
  //     this.mealformValue.reset();
  //     let refClose=document.getElementById('close');
  //     refClose?.click();
  //     this.getAllMeals();
  //   },(err:any)=>{
  //     alert('error');
  //   })
  // }

}
