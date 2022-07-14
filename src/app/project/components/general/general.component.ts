import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup }       from "@angular/forms";
import { Router }                 from "@angular/router";
import { RandomizeService }       from "../../services/randomize.service";
import { BaseData }               from "../../interfaces/base-data.interface";
import { DataService }            from "../../../core/state/data/data.service";
import { DataQuery }              from "../../../core/state/data/data.query";
import { AkitaNgFormsManager }    from "@datorama/akita-ng-forms-manager";
import { ClientService }          from "../../services/client.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  defaultValue: Partial<BaseData> = { systemName: RandomizeService.generateUuid() };

  constructor(
    private router: Router,
    private formsManager: AkitaNgFormsManager<any>,
    private dataService: DataService,
    private dataQuery: DataQuery,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.patchValue();
    this.storeForm();
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe();
  }

  buildForm(): void {
    this.myForm = new FormGroup({
      systemName: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      executionPriority: new FormControl(),
    });
  }

  patchValue(): void {
    this.myForm.patchValue(this.clientService.getDataFromBack() || this.defaultValue);
  }

  storeForm(): void {
    console.log(this.formsManager.getForm('general'));
    this.formsManager.upsert('general', this.myForm);
  }

  submit(): void {
    // this.dataService.update(this.myForm.value);
  }
}
