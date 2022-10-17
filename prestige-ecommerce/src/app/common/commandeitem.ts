import { PanierItem } from "./panier-item";

export class CommandeItem {

    image!: string;
    prix! : number;
    quantite! : number;
    produitId!: string;

    constructor(panierItem?: PanierItem) {
        this.image = panierItem?.image || '';
        this.quantite = panierItem?.quantite || 0;
        this.prix = panierItem?.prix || 0;
        this.produitId = panierItem?.id || '';

    }
}
