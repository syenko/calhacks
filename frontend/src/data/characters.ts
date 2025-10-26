export enum CharacterId {
    Alice = "alice",
    Bob = "bob",
    Claire = "claire",
    David = "david",
}

export type Character = {
    name: string;
    folder: string;
};

export const characterMap: Record<CharacterId, Character> = {
    [CharacterId.Alice]: { name: "Alice", folder: "alice" },
    [CharacterId.Bob]: { name: "Bob", folder: "bob" },
    [CharacterId.Claire]: { name: "Claire", folder: "claire" },
    [CharacterId.David]: { name: "David", folder: "david" },
};

export function getCharacterImages(id: CharacterId) {
    return {
        headshot: `/characters/${id}/headshot.png`,
        fullbody: `/characters/${id}/fullbody.png`,
    };
}
