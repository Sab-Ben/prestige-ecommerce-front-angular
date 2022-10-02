import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Achat } from '../common/achat';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private achatUrl = environment.apiUrl+'/api/paiement/achat';

  constructor(private httpClient: HttpClient) { }

  passerCommande(achat : Achat): Observable<any> {
    return this.httpClient.post<Achat>(this.achatUrl, achat);
  }
}
