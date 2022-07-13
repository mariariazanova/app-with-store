import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { RandomizeService }       from "../../services/randomize.service";
import { BaseData }               from "../../interfaces/base-data.interface";
import { Router }                     from "@angular/router";
import { StoreService } from "../../services/store.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  myForm!: FormGroup;
  data!: Partial<BaseData>;
  defaultValue: Partial<BaseData> = { systemName: RandomizeService.generateUuid() };

  constructor(private router: Router, private storeService: StoreService) { }

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
    this.data = this.mapData(this.storeService.store.dataItems);
  }

  mapData({ systemName, name, description, executionPriority }: BaseData): Partial<BaseData> {
    return {
      systemName, name, description, executionPriority
    }
  }

  patchValue(): void {
    this.myForm.patchValue(this.data);
    if (!this.myForm.get('systemName')?.value) {
      this.myForm.patchValue(this.defaultValue);
    }
  }

  submit(): void {
    this.storeService.store = {
      ...this.storeService.store,
      dataItems: { ...this.storeService.store.dataItems, ...this.myForm.value }
    };
  }
}
