import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularLibraryModule } from 'angular-library';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularLibraryModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
