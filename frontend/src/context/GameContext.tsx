"use client";
import { createContext } from "react";
import { CharacterId } from "@/data/characters";

export const GameContext = createContext<{
    characters: CharacterId[];
    setCharacters: (characters: CharacterId[]) => void;
}>({
    characters: [],
    setCharacters: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [characters, setCharacters] = useState<CharacterId[]>([]);
    return (
        <GameContext.Provider value={{ characters, setCharacters }}>
            {children}
        </GameContext.Provider>
    );
};
