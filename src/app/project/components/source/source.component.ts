import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup }       from "@angular/forms";
import { Router }                 from "@angular/router";
import { DataService }            from "../../../core/state/data/data.service";
import { DataQuery }              from "../../../core/state/data/data.query";
import { AkitaNgFormsManager }    from "@datorama/akita-ng-forms-manager";
import { ClientService }          from "../../services/client.service";

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;

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
      sourceDataBase: new FormControl(),
      sourceSchema: new FormControl(),
      sourceTable: new FormControl(),
    });
  }

  patchValue(): void {
    this.myForm.patchValue(this.clientService.getDataFromBack());
  }

  storeForm(): void {
    this.formsManager.upsert('source', this.myForm);
  }

  submit(): void {
    // this.dataService.update(this.myForm.value);
  }
}
