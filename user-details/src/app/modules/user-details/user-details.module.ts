import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { UserDetailsComponent } from './user-details.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { SharedModule } from '../../modules/shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { AngularWebStorageModule } from 'angular-web-storage';

@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    FormsModule,        
    ReactiveFormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB3Qi4rnLSKkipRhehf-WIoykA9gJkrwdc",
      libraries: ["places"]
    }),
    AngularWebStorageModule
  ],
  declarations: [UserDetailsComponent],
  providers: [],
  exports: [
    UserDetailsComponent 
  ]
})
export class UserDetailsModule { }
