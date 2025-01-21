import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../utils/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  duration = 4000;
  openSnackBar(message: string, panelClass: string, duration?:number) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {message,panelClass},
      duration: duration === undefined ? this.duration : duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass,
    });
  }

  closeSnackBar(){
    this.snackBar.dismiss();
  }
}
