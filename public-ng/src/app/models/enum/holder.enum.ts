export enum Holder {
    TITULAIRE = 1,
    EXTERNE = -1,
    REMPLACANT = 0
}

export const HolderLabels: Record<Holder, string> = {
    [Holder.TITULAIRE]: "Titulaire",
    [Holder.EXTERNE]: "Externe",
    [Holder.REMPLACANT]: "Remplaçant"
} as const;