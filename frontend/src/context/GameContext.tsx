"use client";
import { createContext, useState, useContext } from "react";
import { CharacterId } from "@/data/characters";

interface GameContextType {
    selectedCharacters: CharacterId[];
    setSelectedCharacters: (characters: CharacterId[]) => void;
    maxTurns: number;
    maxSelected: number;
    setMaxSelected: (maxSelected: number) => void;
    individualTurns: Map<CharacterId, number>;
    setIndividualTurns: (individualTurns: Map<CharacterId, number>) => void;
}

export const GameContext = createContext<GameContextType>({
    selectedCharacters: [],
    setSelectedCharacters: () => {},
    maxTurns: 6,
    maxSelected: 1,
    setMaxSelected: () => {},
    individualTurns: new Map<CharacterId, number>([
        [CharacterId.Daisy, 1],
        [CharacterId.Sienna, 1],
        [CharacterId.Grace, 1],
        [CharacterId.Drew, 1],
    ]),
    setIndividualTurns: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCharacters, setSelectedCharacters] = useState<CharacterId[]>(
        []
    );
    const maxTurns = 6;
    const [maxSelected, setMaxSelected] = useState<number>(1);
    const [individualTurns, setIndividualTurns] = useState<
        Map<CharacterId, number>
    >(
        new Map<CharacterId, number>([
            [CharacterId.Daisy, 1],
            [CharacterId.Sienna, 1],
            [CharacterId.Grace, 1],
            [CharacterId.Drew, 1],
        ])
    );
    return (
        <GameContext.Provider
            value={{
                selectedCharacters,
                setSelectedCharacters,
                maxTurns,
                maxSelected,
                setMaxSelected,
                individualTurns,
                setIndividualTurns,
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
