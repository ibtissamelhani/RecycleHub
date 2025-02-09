import {createAction, props} from "@ngrx/store";
import {Collection} from "../../models/collection";

export const loadCollectorCollections = createAction(
  '[Collection] Load Collector Collections',
  props<{ collectorId: number }>()
);

export const loadCollectorCollectionsSuccess = createAction(
  '[Collection] Load Collector Collections Success',
  props<{ collections: Collection[] }>()
);

export const loadCollectorCollectionsFailure = createAction(
  '[Collection] Load Collector Collections Failure',
  props<{ error: string }>()
);
