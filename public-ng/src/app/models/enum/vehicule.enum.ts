export enum Vehicule {
    CRAFTER = 1,
    VEHICULE_PERSO = 2,
    LOCATION = 3,
    TRAIN = 4
};

export const VehiculeLabels: Record<Vehicule, string> = {
    [Vehicule.CRAFTER]: "Crafter",
    [Vehicule.VEHICULE_PERSO]: "Véhicule(s) Perso",
    [Vehicule.LOCATION]: "Location",
    [Vehicule.TRAIN]: "Billets de train"
};