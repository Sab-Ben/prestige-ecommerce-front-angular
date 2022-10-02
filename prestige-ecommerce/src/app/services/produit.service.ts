import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Produit } from '../common/produit';
import { Observable } from 'rxjs';
import { map }  from 'rxjs/operators';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl = environment.apiUrl + '/api/produits';


  constructor(private httpClient : HttpClient) { }

  getProduit(produitId: number): Observable<Produit> {

    const produitUrl = `${this.baseUrl}/${produitId}`;
    return this.httpClient.get<Produit>(produitUrl);
  }

  getListeProduit(theCategoryId: number) : Observable<Produit[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategorieId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.produits)
    );
  }
}
interface GetResponse {
_embedded : {
    produits : Produit[];
  }
}
