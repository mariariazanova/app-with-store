import { Injectable }                    from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, tap }                    from 'rxjs';
import { loadData, loadDataSuccess }  from "./data.actions";
import { dataFromBack }              from "./data.state";

@Injectable()
export class DataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData),
      switchMap(() => of(dataFromBack).pipe(
        tap(data => console.log(data)),
        map(data => loadDataSuccess({ dataItem: data })),
        // catchError(() => of(loadPhotosError()))
      ))
    )
  );

  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
  ) { }
}
