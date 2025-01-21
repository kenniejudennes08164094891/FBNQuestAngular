import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexDBStoreService {

  private dbName: string = 'appDB'; 
  private storeName: string = 'userData'; 
  private dbVersion: number = 1; 

  private db: IDBDatabase | any;
  constructor() {
    this.openDb();
   }

  private openDb() {
    const request = window.indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event:any) => {
      this.db = event.target.result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        const store = this.db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('data', 'data', { unique: false });
      }
    };

    request.onsuccess = (event:any) => {
      this.db = event.target.result;
    };

    request.onerror = (event) => {
      console.error('Error opening IndexedDB', event);
    };
  }

  addData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event:any) => reject(event.target.error);
    });
  }

  updateData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event:any) => reject(event.target.error);
    });
  }

  getAllData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event:any) => reject(event.target.error);
    });
  }

addNewParameterToExistingPayload(id: number, newParam: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.get(id);

    request.onsuccess = () => {
      let existingData:any = request.result;

      if (existingData) {
        existingData = { ...existingData, ...newParam }; 
        const updateRequest = store.put(existingData); 

        updateRequest.onsuccess = () => resolve(updateRequest.result);
        updateRequest.onerror = (event:any) => reject(event.target.error);
      } else {
        reject('No data found with the given id');
      }
    };

    request.onerror = (event:any) => reject(event.target.error);
  });
}

setSessionStorage(key:string, value: any){
  const data = JSON.stringify(value);
  sessionStorage.setItem(key, data);
}

async getSessionStorage():Promise<any>{
 const step1: any | null = sessionStorage.getItem('step1');
 const step2:any | null =  sessionStorage.getItem('step2');
 const step3: any | null = sessionStorage.getItem('step3');
 const payload = {...JSON.parse(step1),...JSON.parse(step2), ...JSON.parse(step3)};
 return payload;
}

}
