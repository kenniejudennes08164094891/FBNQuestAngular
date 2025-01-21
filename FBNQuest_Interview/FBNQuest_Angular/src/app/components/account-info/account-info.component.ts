import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexDBStoreService } from 'src/app/services/index-db-store.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit{

  userForm!: FormGroup;
  @Output() dataToSend:EventEmitter<any>  = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private store: IndexDBStoreService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/.*\d.*/), // At least one number
          Validators.pattern(/.*[!@#$%^&*(),.?":{}|<>].*/), // At least one special character
        ],
      ],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.error('Some inputs are invalid')
      this.toast.openSnackBar('Some inputs are invalid', 'error');
      return;
    }
   // console.log('Form submitted:', this.userForm.value);
    this.dataToSend.emit(this.userForm.value);
    this.store.setSessionStorage('step1',this.userForm.value);
    this.toast.openSnackBar('Account details saved succesfully!', 'success');
  }
}
