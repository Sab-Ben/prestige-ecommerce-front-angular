import { Produit } from "./produit";

export class PanierItem {

    id!: string;
    nomProduit!: string;
    image!: string;
    prix!: number; 
    quantite!: number;

    constructor(produit?: Produit) {
        this.id = produit?.id || '';
        this.nomProduit = produit?.nomProduit || '';
        this.image = produit?.image || '';
        this.prix = produit?.prix || 0;
        this.quantite = 1;
    }
   
}
