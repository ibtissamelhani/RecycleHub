import { Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {AuthTemplateComponent} from "./layouts/auth-template/auth-template.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {LoginComponent} from "./authentication/login/login.component";
import {DashboardComponent} from "./particular/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";
import {ParticularDashboardComponent} from "./layouts/particular-dashboard/particular-dashboard.component";
import {CollectionsComponent} from "./particular/collection/collections/collections.component";
import {CreateCollectionComponent} from "./particular/collection/create-collection/create-collection.component";
import {CollectionDetailsComponent} from "./particular/collection/collection-details/collection-details.component";
import {ParticularProfileComponent} from "./particular/particular-profile/particular-profile.component";
import {CollectorProfileComponent} from "./collector/collector-profile/collector-profile.component";
import {CollectorDashboardComponent} from "./layouts/collector-dashboard/collector-dashboard.component";

import {DashboardComponent as CoDashboard} from  "./collector/dashboard/dashboard.component"
import {DetailsComponent} from "./collector/collection/details/details.component";
import {CollectionsComponent as CoCollections} from "./collector/collection/collections/collections.component";
import {NotFoundComponent} from "./pages/error/not-found/not-found.component";
import {ForbiddenComponent} from "./pages/error/forbidden/forbidden.component";
import {particularGuard} from "./core/guards/particular.guard";
import {collectorGuard} from "./core/guards/collector.guard";

export const routes: Routes = [
  { path:'', component:LandingComponent},
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'authentication', component: AuthTemplateComponent,
    children: [
      {path: "register", component: RegisterComponent},
      {path: "login", component: LoginComponent}
    ],
  },
  {path:"particular", component:ParticularDashboardComponent,
  children:[
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ParticularProfileComponent},
    { path: 'collections', component: CollectionsComponent},
    { path: 'collections/create', component: CreateCollectionComponent},
    { path: 'collections/details/:id', component: CollectionDetailsComponent},
  ],
  canActivate: [authGuard, particularGuard]
  },
  { path:'collector', component: CollectorDashboardComponent,
    children:[
      { path: 'dashboard', component: CoDashboard},
      { path: 'profile', component: CollectorProfileComponent},
      { path: 'collections', component: CoCollections},
      { path: 'collections/details/:id', component: DetailsComponent},
    ],
    canActivate: [authGuard,collectorGuard]
  },
  { path: '**', component: NotFoundComponent }
];
