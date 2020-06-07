import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // https://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject
  private subject = new Subject<any>();

  constructor() { }

  sendMessage(type:string, message: string) {
    // console.log("SENDING MESSAGE")
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
