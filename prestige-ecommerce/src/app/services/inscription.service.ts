import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from '../common/inscription';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private inscriptionUrl = environment.apiUrl + '/api/inscription/save';

  constructor(private httpClient: HttpClient) { }

  confirmationInscription(inscription : Inscription): Observable<any> {
    return this.httpClient.post<Inscription>(this.inscriptionUrl, inscription);
  }
}
