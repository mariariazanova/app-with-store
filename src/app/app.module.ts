import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { ProjectModule }        from './project/project.module';
import { environment }          from "../environments/environment";
import { AkitaNgDevtools }      from "@datorama/akita-ngdevtools";
import { AkitaPlugin, Store }   from "@datorama/akita";
import { DataStore }            from "./core/state/data";
import { AkitaNgEffectsModule } from "@datorama/akita-ng-effects";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProjectModule,
    // AkitaNgDevtools.forRoot()
    AkitaNgEffectsModule.forRoot([]),
    environment.production ? [] : AkitaNgDevtools.forRoot( )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
