import { Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {AuthTemplateComponent} from "./shared/auth-template/auth-template.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {LoginComponent} from "./authentication/login/login.component";

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
];
