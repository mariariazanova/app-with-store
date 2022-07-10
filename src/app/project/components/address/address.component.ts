import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {RandomizeService} from "../../services/randomize.service";
import {addDataItemFormSubmitted} from "../../../core/state/data";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm!: FormGroup;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.addressForm = new FormGroup({
      // "systemName": new FormControl(RandomizeService.generateUuid()),
      "city": new FormControl(""),
      "street": new FormControl(""),
      "house": new FormControl(""),
      "apartment": new FormControl("")
    });
  }

  submit(): void {
    console.log(this.addressForm);
    console.log(this.addressForm.value);
    this.store.dispatch(
      addDataItemFormSubmitted({
        dataItem: this.addressForm.value,
      })
    );
  }

  btnClick(): void {
    this.router.navigate(['']);
  }
}
