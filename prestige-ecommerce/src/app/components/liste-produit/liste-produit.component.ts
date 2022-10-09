import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/common/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { PanierItem } from 'src/app/common/panier-item';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl : './liste-produit-grille.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit {

  produits: Produit[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private produitService: ProduitService,
              private panierService: PanierService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listeProduits();
    });
  }

  listeProduits(){
    this.searchMode = this.route.snapshot.paramMap.has('mots_cles');
    if (this.searchMode) {
      this.handleRechercheProduits();
    } else {
      this.handleListeProduits();
    }
    
  }
  handleRechercheProduits(){
    const motCle : string = this.route.snapshot.paramMap.get('mots_cles')!;
    this.produitService.rechercheProduits(motCle).subscribe(
      data => {
        this.produits = data;
      }
    )
  }

  handleListeProduits() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }


    this.produitService.getListeProduit(this.currentCategoryId).subscribe(
      data => {
        this.produits = data;
      }
    )
  }



  addToCart(produit: Produit) {
    let panierItem = new PanierItem(produit.id!, produit.nomProduit, produit.image, produit.prix);

    this.panierService.addToCart(panierItem);
  }

}
