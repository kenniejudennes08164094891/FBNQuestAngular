import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexDBStoreService } from 'src/app/services/index-db-store.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetailsForm!: FormGroup;
   @Output() dataToSend:EventEmitter<any>  = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
     private store: IndexDBStoreService,
      private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', this.dobValidator],
      phoneNumber: ['', this.phoneValidator]
    });
  }

  // Custom validator for date of birth (optional, check date format)
  dobValidator(control: any) {
    if (control.value && !/^\d{4}-\d{2}-\d{2}$/.test(control.value)) {
      return { invalidDateFormat: true };
    }
    return null;
  }

  // Custom validator for phone number (optional, check phone number format)
  phoneValidator(control: any) {
    if (control.value && !/^\d{11}$/.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  onSubmit() {
    if (this.personalDetailsForm.valid) {
     // console.log("payload>>",this.personalDetailsForm.value);
      this.dataToSend.emit(this.personalDetailsForm.value);
      this.store.setSessionStorage('step2',this.personalDetailsForm.value);
      this.toast.openSnackBar('Personal details saved succesfully!', 'success');
    } else {
      console.error('Form is invalid');
      this.toast.openSnackBar('Some inputs are invalid', 'error');
    }
  }
}
