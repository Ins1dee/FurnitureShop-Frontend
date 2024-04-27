import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private registerButtonClickSubject = new Subject<void>();

  registerButtonClick$ = this.registerButtonClickSubject.asObservable();

  triggerRegisterButtonClick() {
    this.registerButtonClickSubject.next();
  }
}