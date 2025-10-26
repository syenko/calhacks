export enum CharacterId {
    Daisy = "Daisy",
    Sienna = "Sienna",
    Grace = "Grace",
    Drew = "Drew",
    Host = "Host",
    Hunter = "hunter",
}

export const mainCharacters = [
    CharacterId.Grace,
    CharacterId.Drew,
    CharacterId.Daisy,
    CharacterId.Sienna,
];

export type Character = {
    name: string;
    folder: string;
};

export const characterMap: Record<CharacterId, Character> = {
    [CharacterId.Grace]: { name: "Grace", folder: "grace" },
    [CharacterId.Drew]: { name: "Drew", folder: "drew" },
    [CharacterId.Daisy]: { name: "Daisy", folder: "daisy" },
    [CharacterId.Sienna]: { name: "Sienna", folder: "sienna" },
    [CharacterId.Host]: { name: "Andy (Host)", folder: "host" },
    [CharacterId.Hunter]: { name: "Hunter", folder: "hunter" },
};

export function getCharacterImages(id: CharacterId) {
    return {
        headshot: `/characters/${id}/headshot.png`,
        fullbody: `/characters/${id}/fullbody.png`,
        top: `/characters/${id}/top.png`,
    };
}
