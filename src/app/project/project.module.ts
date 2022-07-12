import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralComponent } from "./components/general/general.component";
import { SourceComponent } from './components/source/source.component';
import { DayOffsComponent } from "./components/dayOffs/dayOffs.component";
import { CodesComponent } from "./components/codes/codes.component";

@NgModule({
  declarations: [
    GeneralComponent,
    FormComponent,
    NavigationComponent,
    SourceComponent,
    DayOffsComponent,
    CodesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [FormComponent],
})
export class ProjectModule { }
