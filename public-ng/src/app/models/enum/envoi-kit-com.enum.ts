export enum EnvoiKitCom {
    VIDE = 0,
    A_ENVOYER = 1,
    ENVOYE = 2
}

export const EnvoiKitComLabels: Record<EnvoiKitCom, string> = {
    [EnvoiKitCom.VIDE]: "",
    [EnvoiKitCom.A_ENVOYER]: "à envoyer",
    [EnvoiKitCom.ENVOYE]: "envoyé"
};
