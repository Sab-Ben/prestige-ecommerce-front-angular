import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  public isUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
