import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  constructor() { }

  sendMessage(type:string, message: string) {
    console.log("SENDING MESSAGE")
    this.subject.next({type:type, text: message });
  }

  clearMessage() {
    console.log("Clearing Messages")
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
