import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {CollectionEffects} from "./store/collections/collection.effects";
import {provideEffects} from "@ngrx/effects";
import {collectionReducer} from "./store/collections/collection.reducer";
import {provideStore} from "@ngrx/store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ collection: collectionReducer }),
    provideEffects(CollectionEffects),]
};
