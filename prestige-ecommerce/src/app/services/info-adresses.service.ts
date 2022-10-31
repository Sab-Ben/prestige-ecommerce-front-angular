import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoAdresses } from '../common/info-adresses';

@Injectable({
  providedIn: 'root'
})
export class InfoAdressesService {

  private adressesUrl = environment.apiUrl + '/adresses';

  constructor(private httpClient : HttpClient) { }

  recupInfoAdresse(email : string) : Observable<GetResponseAdressesInformations> {
  const infoAdresseUrl = `${this.adressesUrl}/search/findByUtilisateurId?id=${email}`;
  return this.httpClient.get<GetResponseAdressesInformations>(infoAdresseUrl);
  }
}

interface GetResponseAdressesInformations {
_embedded: {
  adresses: InfoAdresses[];
  }
}