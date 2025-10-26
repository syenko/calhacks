"use client";
import { createContext, useState, useContext } from "react";
import { CharacterId } from "@/data/characters";
import { MAX_INDIVIDUAL_TURNS } from "@/data/constants";

interface GameContextType {
    selectedCharacters: CharacterId[];
    setSelectedCharacters: (characters: CharacterId[]) => void;
    maxTurns: number;
    setMaxTurns: (maxTurns: number) => void;
    maxSelected: number;
    setMaxSelected: (maxSelected: number) => void;
    individualTurns: Map<CharacterId, number>;
    setIndividualTurns: (individualTurns: Map<CharacterId, number>) => void;
    groupDates: CharacterId[][];
    setGroupDates: (groupDates: CharacterId[][]) => void;
}

export const GameContext = createContext<GameContextType>({
    selectedCharacters: [],
    setSelectedCharacters: () => {},
    maxTurns: MAX_INDIVIDUAL_TURNS,
    setMaxTurns: () => {},
    maxSelected: 1,
    setMaxSelected: () => {},
    individualTurns: new Map<CharacterId, number>([
        [CharacterId.Daisy, 1],
        [CharacterId.Sienna, 1],
        [CharacterId.Grace, 1],
        [CharacterId.Drew, 1],
    ]),
    setIndividualTurns: () => {},
    groupDates: [],
    setGroupDates: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCharacters, setSelectedCharacters] = useState<CharacterId[]>(
        []
    );
    const [groupDates, setGroupDates] = useState<CharacterId[][]>([]);
    const [maxTurns, setMaxTurns] = useState<number>(MAX_INDIVIDUAL_TURNS);
    const [maxSelected, setMaxSelected] = useState<number>(2);
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
                setMaxTurns,
                maxSelected,
                setMaxSelected,
                individualTurns,
                setIndividualTurns,
                groupDates,
                setGroupDates,
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
