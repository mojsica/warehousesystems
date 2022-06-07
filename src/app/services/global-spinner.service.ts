import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSpinnerService {

  isLoading = new BehaviorSubject<boolean>(false);
  private counter = 0;

  constructor() { }

  activateSpinner() {
    this.counter++;
    if (this.counter === 1) {
      this.isLoading.next(true);
    }
  }

  deactivateSpinner() {
    this.counter--;
    if (this.counter === 0) {
      this.isLoading.next(false);
    }
  }

}
