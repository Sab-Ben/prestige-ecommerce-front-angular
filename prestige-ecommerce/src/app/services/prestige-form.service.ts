import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestigeFormService {

  constructor() { }

  getCarteCreditMois(debutMois: number): Observable<number[]>{
    
    let data: number[] = [];

    for (let mois = debutMois; mois <= 12; mois++) {
      data.push(mois);
    }

    return of(data);
  }


  getCarteCreditAnnee(): Observable<number[]> {
    let data : number[] = [];

    const debutAnnee: number = new Date().getFullYear();
    const finAnnee: number = debutAnnee + 10;

    for (let annee = debutAnnee; annee<= finAnnee; annee++){
      data.push(annee);
    }

    return of(data);
  }
}
