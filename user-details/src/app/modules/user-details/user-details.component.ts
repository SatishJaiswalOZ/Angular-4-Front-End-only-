import {Component, OnInit, ViewChild,Output,EventEmitter,ElementRef, NgZone, } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl  } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { DatePickerComponent } from 'ng2-date-picker';
import{ IData } from './user-details.component.interface'
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-search-input',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: []
})

export class UserDetailsComponent implements OnInit {
  private inputElem: any;

  myForm: FormGroup; 
  location: FormControl;
  zoom: number=0;
  KEY:string = 'jsonData';
  submittedStatus:string = '';

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('dayPicker') datePicker: DatePickerComponent;
    
  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private local: LocalStorageService, 
    private session: SessionStorageService,
    public elr: ElementRef){ 
      this.searchElementRef=elr;
     }

   currentDataIData:IData={
     name:'', 
     email:'',
     dob:'',
     location:'',
     latitude:-37.81446799999999,
     longitude:144.93834779999997};

  ngOnInit() {
    this.myForm = this.fb.group({  
      'name': ['', Validators.required],
      'location': ['',Validators.required],
      'dateInput':['',Validators.required],
      'email':['', Validators.email]
    }); 

    //set google maps defaults
    this.zoom = 4;
    //load UI data from local storage if any.
    this.updateUIfromLocalStorage();

    //set current position. Another way can be to skip this & update google marker position to
    //the one stored in local storage if any. But for this demo, it will always show the current location
    //by default.
    this.setCurrentPosition();

    //This can be an asynch call.
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
 
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //the selected full address
          this.currentDataIData.location = place.formatted_address;
          //set latitude, longitude and zoom
          this.currentDataIData.latitude = place.geometry.location.lat();
          this.currentDataIData.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  open() {
      this.datePicker.api.open();
  }

  close() {
       this.datePicker.api.close();
  }

  onSubmit(form: any): void {  
    console.log('you submitted value:', form);
    //another way do exist to bind data through which form.valid can be true once 
    //control loads oninit() from local storage but for now, used belong flag.
    if(this.myForm.valid || this.currentDataIData.name !='')
    {
      let dataToStore:IData={
        name: form.name, 
        email:form.email, 
        dob:form.dateInput,
        location:this.currentDataIData.location,
        latitude:this.currentDataIData.latitude,
        longitude:this.currentDataIData.longitude}

      this.saveDataToLocalStorage(dataToStore);
      this.submittedStatus='Data Stored Succesfully';

      //disappear the success message after few seconds.
      setTimeout(function() {
        this.submittedStatus=undefined;
      }.bind(this), 3000);
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentDataIData.latitude = position.coords.latitude;
        this.currentDataIData.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private saveDataToLocalStorage(currentData:IData) {
    this.local.set(this.KEY,JSON.stringify(currentData));
  }

  private updateUIfromLocalStorage() {
    let storedData =JSON.parse(this.local.get(this.KEY));
    this.currentDataIData = storedData as IData;
  }
}
