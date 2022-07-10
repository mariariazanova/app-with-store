import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addDataItemFormSubmitted, selectDataItems } from "../../../core/state/data";
import { RandomizeService } from "../../services/randomize.service";
import { Observable, tap } from "rxjs";
import { BaseData } from "../../interfaces/base-data.interface";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  myForm!: FormGroup;
  baseData$ = this.store.select(selectDataItems);
  data$!: Observable<Partial<BaseData>>;
  defaultValue: Partial<BaseData> = { systemName: RandomizeService.generateUuid() };

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
    this.patchValue();
  }

  buildForm(): void {
    this.myForm = new FormGroup({
      "systemName": new FormControl(),
      "name": new FormControl(),
      "description": new FormControl(),
      "executionPriority": new FormControl(),
    });
  }

  loadData(): void {
    this.data$ = this.baseData$.pipe(tap(baseData => this.mapData(baseData)));
  }

  mapData({ systemName, name, description, executionPriority }: BaseData): Partial<BaseData> {
    return {
      systemName, name, description, executionPriority
    }
  }

  patchValue(): void {
    this.data$.subscribe(data => {
      this.myForm.patchValue(data);
      if (!this.myForm.get('systemName')?.value) {
        this.myForm.patchValue(this.defaultValue);
      }
    });
  }

  submit(): void {
    this.store.dispatch(
      addDataItemFormSubmitted({
        dataItem: this.myForm.value,
      })
    );
  }
}
