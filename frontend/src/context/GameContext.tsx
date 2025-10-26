"use client";
import { createContext, useState, useContext } from "react";
import { CharacterId } from "@/data/characters";

interface GameContextType {
    selectedCharacters: CharacterId[];
    setSelectedCharacters: (characters: CharacterId[]) => void;
    maxTurns: number;
    maxSelected: number;
    setMaxSelected: (maxSelected: number) => void;
}

export const GameContext = createContext<GameContextType>({
    selectedCharacters: [],
    setSelectedCharacters: () => {},
    maxTurns: 10,
    maxSelected: 2,
    setMaxSelected: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCharacters, setSelectedCharacters] = useState<CharacterId[]>(
        []
    );
    const maxTurns = 6;
    const [maxSelected, setMaxSelected] = useState<number>(2);

    return (
        <GameContext.Provider
            value={{
                selectedCharacters,
                setSelectedCharacters,
                maxTurns,
                maxSelected,
                setMaxSelected,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

// Custom hook for using GameContext
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
