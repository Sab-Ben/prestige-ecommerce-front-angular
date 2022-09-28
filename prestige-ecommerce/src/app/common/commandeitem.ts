import { PanierItem } from "./panier-item";

export class CommandeItem {

    image!: string;
    prix! : number;
    quantite! : number;
    produitId!: string;

    constructor(panierItem: PanierItem) {
        this.image = panierItem.image;
        this.quantite = panierItem.quantite;
        this.prix = panierItem.prix;

    }
}
