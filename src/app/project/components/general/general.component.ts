import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router }                 from "@angular/router";
import { RandomizeService }       from "../../services/randomize.service";
import { Observable, tap }        from "rxjs";
import { BaseData }               from "../../interfaces/base-data.interface";
import { DataService }            from "../../../core/state/data/data.service";
import { DataQuery }              from "../../../core/state/data/data.query";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  myForm!: FormGroup;
  baseData$ = this.dataQuery.select('dataItems');
  data$!: Observable<Partial<BaseData>>;
  defaultValue: Partial<BaseData> = { systemName: RandomizeService.generateUuid() };

  constructor(private router: Router, private dataService: DataService, private dataQuery: DataQuery) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
    this.patchValue();
  }

  buildForm(): void {
    this.myForm = new FormGroup({
      systemName: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      executionPriority: new FormControl(),
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
    this.dataService.update(this.myForm.value);
  }
}
