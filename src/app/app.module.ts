import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MainformModule } from './main-page/main.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule, } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MainformModule,
    FormsModule,
    ReactiveFormsModule,
    // ModalModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
