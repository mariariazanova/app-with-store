import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addDataItemFormSubmitted } from "../../core/state/data";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.myForm = new FormGroup({

      "name": new FormControl(""),
      "surname": new FormControl(""),
      "email": new FormControl(""),
      "phone": new FormControl("")
    });
  }

  submit(): void {
    console.log(this.myForm);
    console.log(this.myForm.value);
    this.store.dispatch(
      addDataItemFormSubmitted({
        dataItem: this.myForm.value,
      })
    );
  }

  btnClick(): void {
    this.router.navigate(['/data']);
  }
}
