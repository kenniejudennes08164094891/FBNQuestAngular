import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IndexDBStoreService } from 'src/app/services/index-db-store.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-final-review',
  templateUrl: './final-review.component.html',
  styleUrls: ['./final-review.component.scss']
})
export class FinalReviewComponent implements OnInit{

  dataArray:any[] = [];
     @Output() dataToSend:EventEmitter<any>  = new EventEmitter<any>()
  constructor(
    private store: IndexDBStoreService,
     private toast: ToastService
  ){}

  async ngOnInit(): Promise<any> {
    const data = await this.store.getSessionStorage();
    // console.log("data>>", data);
    const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
      key: key,
      value: value
    }));
    this.dataArray = arrayOfObjects;
  }


  submit(){
    this.dataToSend.emit(this.dataArray);
    this.toast.openSnackBar('Congratulations!...You data has been submitted successfully!', 'success');
  }
}
