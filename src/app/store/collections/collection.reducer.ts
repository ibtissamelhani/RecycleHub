import {createReducer, on} from "@ngrx/store";
import {initialCollectionState} from "./collection.state";
import * as CollectionActions from './collection.actions';

export const collectionReducer = createReducer(
  initialCollectionState,

  // Load Collections
  on(CollectionActions.loadCollectorCollections, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CollectionActions.loadCollectorCollectionsSuccess, (state, { collections }) => ({
    ...state,
    collections,
    loading: false
  })),
  on(CollectionActions.loadCollectorCollectionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
)
