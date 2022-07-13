import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule }    from './app-routing.module';
import { AppComponent }        from './app.component';
import { ProjectModule }       from './project/project.module';
import { environment }         from '../environments/environment';
import { StoreModule }         from '@ngrx/store';
import { reducers }            from "./core/state";
import { EffectsModule }       from "@ngrx/effects";
import { DataEffects }         from "./core/state/data/data.effects";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProjectModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot( reducers , {  }),
    EffectsModule.forRoot([DataEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
