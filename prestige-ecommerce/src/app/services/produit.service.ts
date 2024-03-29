import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Produit } from '../common/produit';
import { Observable } from 'rxjs';
import { map }  from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReturnStatement } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
 
  private baseUrl = environment.apiUrl + '/produits';

  constructor(private httpClient : HttpClient) { }

  getProduit(produitId: number): Observable<Produit> {
  
    const produitUrl = `${this.baseUrl}/${produitId}`;
    return this.httpClient.get<Produit>(produitUrl);
  }

  
  getListeProduit(theCategoryId: number) : Observable<Produit[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategorieId?id=${theCategoryId}`;

    return this.getProduits(searchUrl);
  }


  rechercheProduits(motCle: string): Observable<Produit[]> {
    const searchUrl = `${this.baseUrl}/search/findByNomProduitContaining?nomProduit=${motCle}`;
 
    return this.getProduits(searchUrl);
  }

    private getProduits(searchUrl: string): Observable<Produit[]> {
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