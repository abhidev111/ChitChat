import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatpageComponent } from './components/chatpage/chatpage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '' , redirectTo:"signin", pathMatch: 'full' 
  },
  {
    path:'signin', component:SigninComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'chat', component:ChatpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
