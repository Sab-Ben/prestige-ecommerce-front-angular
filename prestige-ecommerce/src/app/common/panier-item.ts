import { number } from "card-validator";
import { Produit } from "./produit";

export class PanierItem {

    constructor( public id?: string,
    public nomProduit?: string,
    public image?: string,
    public prix: number = 1, 
    public quantite: number = 1,
    ){ }
   
}
