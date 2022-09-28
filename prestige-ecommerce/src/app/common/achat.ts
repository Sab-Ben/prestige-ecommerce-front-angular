import { Adresse } from "./adresse";
import { Commande } from "./commande";
import { Utilisateur } from "./utilisateur";
import { CommandeItem } from "./commandeitem";

export class Achat {

    utilisateur! : Utilisateur;
    adresse! : Adresse;
    commande! : Commande;
    commandeItems! : CommandeItem[];
}
