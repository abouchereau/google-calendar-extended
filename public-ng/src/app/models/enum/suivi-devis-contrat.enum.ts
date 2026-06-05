export enum SuiviDevisContrat {
    VIDE = 0,
    DEVIS_ENVOYE = 1,
    CONTRAT_ENVOYE = 2,   
    CONFIRME = 3,
    ANNULE_SUPPRIME = 4,
    EN_DIRECT = 5  
}

export const SuiviDevisContratLabels: Record<SuiviDevisContrat, string> = {
    [SuiviDevisContrat.VIDE]: "",
    [SuiviDevisContrat.DEVIS_ENVOYE]: "Devis envoyé",   
    [SuiviDevisContrat.CONTRAT_ENVOYE]: "Contrat envoyé",
    [SuiviDevisContrat.CONFIRME]: "Confirmé",
    [SuiviDevisContrat.ANNULE_SUPPRIME]: "Annulé/Supprimé",
    [SuiviDevisContrat.EN_DIRECT]: "En direct"
};
