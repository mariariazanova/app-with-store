import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store }               from "@ngrx/store";
import { DataState, loadData } from "./core/state/data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private store: Store<DataState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadData());
  }
}
