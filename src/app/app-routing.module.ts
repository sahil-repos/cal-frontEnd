import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MealsComponent } from './meals/meals.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent,
  },
  {
    path:'signup',component:SignupComponent,
  },
  {
    path:'dashboard',component:UserDashboardComponent,canActivate:[AuthGuardService]
  },
  {
    path:'meals',component:MealsComponent,canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
