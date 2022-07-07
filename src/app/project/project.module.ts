import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DataComponent } from './data/data.component';



@NgModule({
  declarations: [
    FormComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [FormComponent],
})
export class ProjectModule { }
