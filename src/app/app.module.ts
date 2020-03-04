import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { auth as firebaseAuth, initializeApp } from 'firebase';
=======

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
>>>>>>> af9a4923f17538790ffef22a16dc55e3345c105d
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

initializeApp(environment.firebase);
firebaseAuth().setPersistence(firebaseAuth.Auth.Persistence.LOCAL);


@NgModule({
  declarations: [AppComponent],
<<<<<<< HEAD
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebase), BrowserAnimationsModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
=======
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
  ],
  providers: [],
>>>>>>> af9a4923f17538790ffef22a16dc55e3345c105d
  bootstrap: [AppComponent],
})
export class AppModule {}
