export enum CharacterId {
    Daisy = "daisy",
    Sienna = "sienna",
    Grace = "grace",
    Drew = "drew",
    Hunter = "hunter",
}

export type Character = {
    name: string;
    folder: string;
};

export const characterMap: Record<CharacterId, Character> = {
    [CharacterId.Daisy]: { name: "Daisy", folder: "daisy" },
    [CharacterId.Sienna]: { name: "Sienna", folder: "sienna" },
    [CharacterId.Grace]: { name: "Grace", folder: "grace" },
    [CharacterId.Drew]: { name: "Drew", folder: "drew" },
    [CharacterId.Hunter]: { name: "Hunter", folder: "hunter" },
};

export function getCharacterImages(id: CharacterId) {
    return {
        headshot: `/characters/${id}/headshot.png`,
        fullbody: `/characters/${id}/fullbody.png`,
        top: `/characters/${id}/top.png`,
    };
}
