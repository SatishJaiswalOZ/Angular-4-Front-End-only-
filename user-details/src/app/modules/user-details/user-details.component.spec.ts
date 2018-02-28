import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { DpDatePickerModule } from 'ng2-date-picker';
import { SharedModule } from '../../modules/shared/shared.module';
import { UserDetailsComponent } from './user-details.component';
import { AgmCoreModule } from '@agm/core';
import { AngularWebStorageModule } from 'angular-web-storage';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
   // expect(component).toBeTruthy();
 // });
});
