import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { SecurityQuestionsComponent } from './components/security-questions/security-questions.component';
import { FinalReviewComponent } from './components/final-review/final-review.component';
import { ToastComponent } from './utils/toast/toast.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialModules = [
  MatStepperModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatToolbarModule,MatIconModule,MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    AccountInfoComponent,
    PersonalDetailsComponent,
    SecurityQuestionsComponent,
    FinalReviewComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    materialModules,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
