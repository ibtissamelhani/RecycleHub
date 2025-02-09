import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CollectionState} from "./collection.state";

export const selectCollectionState = createFeatureSelector<CollectionState>('collection');

export const selectCollectorCollections = createSelector(
  selectCollectionState,
  state => state.collections
);

export const selectCollectionLoading = createSelector(
  selectCollectionState,
  (state) => state.loading
);

export const selectCollectionError = createSelector(
  selectCollectionState,
  (state) => state.error
);
