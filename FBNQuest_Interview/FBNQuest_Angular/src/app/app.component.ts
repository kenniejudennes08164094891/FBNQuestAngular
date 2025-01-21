import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, inject, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { initFlowbite } from 'flowbite';
import { IndexDBStoreService } from './services/index-db-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AppComponent implements OnInit{
  title = 'FBNQuest_Angular';
  @ViewChild('stepper') stepper!: MatStepper;
  constructor(
    private store:IndexDBStoreService
  ){}

 async ngOnInit(): Promise<any> {
    initFlowbite();
    const data = await this.store.getSessionStorage();
    console.log("data>>", data);
  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });

  routeToNextStep(event:any){
    console.log("received>>", event);
    if(event){
      this.stepper.next();
    }
  }
  
}
