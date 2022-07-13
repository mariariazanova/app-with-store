import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router }                 from "@angular/router";
import { BaseData }               from "../../interfaces/base-data.interface";
import { StoreService }           from "../../services/store.service";

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  myForm!: FormGroup;
  data!: Partial<BaseData>;

  constructor(private router: Router, private storeService: StoreService) { }

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
    this.data = this.mapData(this.storeService.store.dataItems);
  }

  mapData({ sourceDataBase, sourceSchema, sourceTable }: BaseData): Partial<BaseData> {
    return {
      sourceDataBase, sourceSchema, sourceTable
    }
  }

  patchValue(): void {
    this.myForm.patchValue(this.data);
  }

  submit(): void {
    this.storeService.store = {
      ...this.storeService.store,
      dataItems: { ...this.storeService.store.dataItems, ...this.myForm.value }
    };
  }
}
