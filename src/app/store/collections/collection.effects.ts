import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import * as CollectionActions from './collection.actions';
import {CollectionService} from "../../core/service/collection.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CollectionEffects {

  loadCollectorCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.loadCollectorCollections),
      mergeMap(({ collectorId }) =>
        this.collectionService.getCollectionsByCollectorId(collectorId).pipe(
          map(collections => CollectionActions.loadCollectorCollectionsSuccess({ collections })),
          catchError(error => of(CollectionActions.loadCollectorCollectionsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private collectionService: CollectionService
  ) {}
}
