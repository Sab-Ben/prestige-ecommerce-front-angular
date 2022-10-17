import { TemplateBindingParseResult } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PanierItem } from '../common/panier-item';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panierItems: PanierItem[] = [];

  totalPrix: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantite: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem('panierItems')!);
    if (data != null) {
      this.panierItems = data;
      this.calculPanierTotals();
    }
  }

  addToCart(panierItem: PanierItem) {

    // observer si le produit est déjà dans le panier
    let produitDejaDansLePanier : boolean = false;
    let existeDansLePanier : PanierItem = undefined;

    if(this.panierItems.length > 0) {

      // trouver le produit dans le panier à partir de l'id
      existeDansLePanier = this.panierItems.find( tempPanierItem => tempPanierItem.id === panierItem.id );

      // vérifier si on le
      produitDejaDansLePanier  = (existeDansLePanier != undefined);
    }
      if (produitDejaDansLePanier){
        //incrémenter la quantité
        existeDansLePanier.quantite++;
      } else{
        // ajouter le produit dans le panier
        this.panierItems.push(panierItem);
      }
    
    // calculer le prix total et la quantité totale
    this.calculPanierTotals();
  }

  calculPanierTotals() {
  let valeurPrixTotal: number = 0;
  let valeurQuantiteTotal: number = 0;

  for (let actuelPanierItem of this.panierItems) {
    valeurPrixTotal += actuelPanierItem.quantite * actuelPanierItem.prix;
    valeurQuantiteTotal += actuelPanierItem.quantite;
  }
      // éditer les nouvelles valeurs afin que cela soit mis à jour auprès du component panier-status
      this.totalPrix.next(valeurPrixTotal);
      this.totalQuantite.next(valeurQuantiteTotal);

      this.persistPanierItems();
  }

  persistPanierItems(){
    this.storage.setItem('panierItems', JSON.stringify(this.panierItems));
  }

  removeToCart(panierItem: PanierItem){
    panierItem.quantite--;

    if(panierItem.quantite === 0) {
      this.remove(panierItem);
    } else {
      this.calculPanierTotals();
    }
  }

  remove(panierItem: PanierItem){
    // obtenir l'index de l'objet dans le tableau
    const itemIndex = this.panierItems.findIndex( tempPanierItem => tempPanierItem.id === panierItem.id);

    // dès qu'il est trouvé, retirer l'objet du tableau à l'index indiqué
    if(itemIndex > -1) {
      this.panierItems.splice(itemIndex, 1);

      this.calculPanierTotals();
    }
  }
  
}
