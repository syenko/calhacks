"use client";
import { useState } from "react";
import { CharacterId } from "@/data/characters";
import Background from "@/components/Background";
import CharacterHeadshot from "@/components/CharacterHeadshot";
import PixelButton from "@/components/PixelButton";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

export default function Select() {
    const {
        selectedCharacters,
        setSelectedCharacters,
        maxSelected,
        individualTurns,
        maxTurns,
    } = useGame();
    const router = useRouter();

    const handleSelect = (character: CharacterId, selected: boolean) => {
        if (maxSelected === 1) {
            setSelectedCharacters([character]);
            return;
        }

        if (selected && selectedCharacters.length < maxSelected) {
            setSelectedCharacters([...selectedCharacters, character]);
        } else {
            setSelectedCharacters(
                selectedCharacters.filter((c) => c !== character)
            );
        }
    };

    return (
        <div>
            <Background src="/backgrounds/room.png" opacity={100} />
            <div className="text-4xl text-white font-bold">Pick a date:</div>
            <div className="flex flex-row">
                {Object.values(CharacterId).map((character) => (
                    <CharacterHeadshot
                        onSelect={(selected) =>
                            handleSelect(character, selected)
                        }
                        selected={selectedCharacters.includes(character)}
                        showName={true}
                        showHoverEffect={true}
                        key={character}
                        id={character}
                        size="large"
                        disabled={
                            maxSelected === 1 &&
                            (individualTurns.get(character) ?? 0) >= maxTurns
                        }
                    />
                ))}
            </div>
            <div className="flex flex-row justify-between items-center w-full text-white">
                <div className="font-bold">
                    {selectedCharacters.length} / {maxSelected} selected
                </div>
                <PixelButton
                    onClick={() => router.push("/chat")}
                    disabled={selectedCharacters.length != maxSelected}
                    height={60}
                >
                    Go
                </PixelButton>
            </div>
        </div>
    );
}
