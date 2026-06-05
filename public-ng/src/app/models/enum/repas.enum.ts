export enum Repas {
    VIDE = 0,
    PREVU_ORGA = 1,
    COLLECTIF_SAUGRENUE = 2,
    PAS_DE_REPAS = 3
}


export const RepasLabels: Record<Repas, string> = {
  [Repas.VIDE]: "",
  [Repas.PREVU_ORGA]: "Prévu Orga",
  [Repas.COLLECTIF_SAUGRENUE]: "Collectif Saugrenue",
  [Repas.PAS_DE_REPAS]: "Pas de repas"
};
