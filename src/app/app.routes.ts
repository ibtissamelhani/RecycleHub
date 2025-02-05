import { Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {AuthTemplateComponent} from "./layouts/auth-template/auth-template.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {LoginComponent} from "./authentication/login/login.component";
import {DashboardComponent} from "./particular/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";
import {ParticularDashboardComponent} from "./layouts/particular-dashboard/particular-dashboard.component";
import {ProfileComponent} from "./particular/profile/profile.component";

export const routes: Routes = [
  { path:'', component:LandingComponent},
  { path: 'authentication', component: AuthTemplateComponent,
    children: [
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      }
    ],
  },
  {path:"particular", component:ParticularDashboardComponent,
  children:[
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent},
  ],
  canActivate: [authGuard]}
];
