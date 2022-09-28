import { Component, OnInit } from '@angular/core';
import { PanierItem } from 'src/app/common/panier-item';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier-details',
  templateUrl: './panier-details.component.html',
  styleUrls: ['./panier-details.component.css']
})
export class PanierDetailsComponent implements OnInit {

  panierItems: PanierItem[] = [];
  totalPrix: number = 0;
  totalQuantite: number = 0;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.listePanierdetails();
  }
  listePanierdetails() {

    // obtenir un accès aux produits du panier
    this.panierItems = this.panierService.panierItems;
    
    // suivre les événements de totalPrix du panier
    this.panierService.totalPrix.subscribe(
      data => this.totalPrix = data
      );

      // suivre les événement du totalQuantité
      this.panierService.totalQuantite.subscribe(
        data => this.totalQuantite = data
      );

      // calculer le prix total et la quantité totale
      this.panierService.calculPanierTotals();

  }

  incrementQuantite(panierItem: PanierItem) {
    this.panierService.addToCart(panierItem);
  }

  decrementQuantite(panierItem: PanierItem) {
    this.panierService.removeToCart(panierItem);
  }

  remove(panierItem: PanierItem){
    this.panierService.remove(panierItem);
  }

}
