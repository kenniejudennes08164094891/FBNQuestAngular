import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexDBStoreService } from 'src/app/services/index-db-store.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss']
})
export class SecurityQuestionsComponent implements OnInit{

  securityForm!: FormGroup;
  securityQuestions: string[] = [
    'What is your mother’s maiden name?',
    'What was the name of your first pet?',
    'What was the name of your elementary school?',
    'What is your favorite color?',
    'What city were you born in?'
  ];

   @Output() dataToSend:EventEmitter<any>  = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
     private store: IndexDBStoreService,
       private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.securityForm = this.fb.group({
      question1: ['', Validators.required],
      answer1: ['', Validators.required],
      question2: ['', Validators.required],
      answer2: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.securityForm.valid) {
      // console.log('Form Submitted!', this.securityForm.value);
      this.dataToSend.emit(this.securityForm.value);
      this.store.setSessionStorage('step3',this.securityForm.value);
      this.toast.openSnackBar('Personal details saved succesfully!', 'success');
    } else {
      console.error('Form is invalid');
      this.toast.openSnackBar('Some inputs are invalid', 'error');
    }
  }
}
