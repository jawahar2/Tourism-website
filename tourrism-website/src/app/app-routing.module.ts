import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { PtripsComponent } from './ptrips/ptrips.component';
import { RegisterComponent } from './register/register.component';


// const routes: Routes = [];

const routes: Routes = [
  //to load home page
  { path: 'home', component:HomeComponent},
  { path: 'home/:userId',component:HomeComponent},


  //for login and register
  { path: 'login', component: LoginComponent },
  { path: 'packages/:id', component: PackagesComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'plannedTrips', component: PtripsComponent },


  { path: 'book/:id', component: BookComponent },


  { path: 'register', component: RegisterComponent },


  
  //handlers for empty path and catch all
  { path: '',component:HomeComponent },
  { path: "**",redirectTo:"",pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
