import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { UtilityModule } from "./utility/utility.module";
import { RenamePipe } from "./pipes/rename.pipe";


@NgModule({
  declarations: [
    AppComponent,
   // RenamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    HttpModule,
    HttpClientModule,
    UtilityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
