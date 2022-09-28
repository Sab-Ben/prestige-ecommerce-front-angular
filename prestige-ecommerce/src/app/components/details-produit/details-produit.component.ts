import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanierItem } from 'src/app/common/panier-item';
import { Produit } from 'src/app/common/produit';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {

  produit: Produit = new Produit;

  constructor(private produitService: ProduitService,
              private panierService : PanierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleDetailsProduit();
    })
  }
  handleDetailsProduit() {
    // récupérer l'id du paramètre string, convertir le string en number en utilisant le symbole "+"
    const produitId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produitService.getProduit(produitId).subscribe(
      data =>{
        this.produit =data;
      }
    )

  }
  addToCart(produit: Produit){
    let panierItem = new PanierItem(produit.id!, produit.nomProduit!, produit.image, produit.prix);
    this.panierService.addToCart(panierItem);
  }
}
