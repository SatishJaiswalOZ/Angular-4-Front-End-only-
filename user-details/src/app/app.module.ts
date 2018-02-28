import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// import our module 
import { UserDetailsModule } from './modules/user-details/user-details.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserDetailsModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
