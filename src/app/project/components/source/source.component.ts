import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { BaseData } from "../../interfaces/base-data.interface";
import { AddData } from "../../../actions/app.actions";

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  myForm!: FormGroup;
  baseData$: Observable<BaseData> = this.store.select(state => state.data.dataItems);
  data$!: Observable<Partial<BaseData>>;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
    this.patchValue();
  }

  buildForm(): void {
    this.myForm = new FormGroup({
      sourceDataBase: new FormControl(),
      sourceSchema: new FormControl(),
      sourceTable: new FormControl(),
    });
  }

  loadData(): void {
    this.data$ = this.baseData$.pipe(tap(baseData => this.mapData(baseData)));
  }

  mapData({ sourceDataBase, sourceSchema, sourceTable }: BaseData): Partial<BaseData> {
    return {
      sourceDataBase, sourceSchema, sourceTable
    }
  }

  patchValue(): void {
    this.data$.subscribe(data => {
      this.myForm.patchValue(data);
    });
  }

  submit(): void {
    this.store.dispatch(new AddData(this.myForm.value));
  }
}
