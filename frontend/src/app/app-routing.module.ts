import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
