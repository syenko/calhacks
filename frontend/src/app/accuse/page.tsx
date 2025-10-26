"use client";
import Background from "@/components/Background";
import { CharacterId } from "@/data/characters";
import CharacterHeadshot from "@/components/CharacterHeadshot";
import PixelButton from "@/components/PixelButton";
import { useState } from "react";

export default function AccusePage() {
    const [selectedCharacter, setSelectedCharacter] =
        useState<CharacterId | null>(null);

    const handleSelect = (character: CharacterId, selected: boolean) => {
        if (selected) {
            setSelectedCharacter(character);
        } else {
            setSelectedCharacter(null);
        }
    };

    const handleAccuse = () => {
        if (selectedCharacter) {
        }
    };

    return (
        <div>
            <Background src={"/backgrounds/outside.png"} opacity={100} />
            <div className="text-4xl text-white font-bold">
                Accuse the killer?
            </div>
            <div className="flex flex-row">
                {Object.values(CharacterId).map((character) => (
                    <CharacterHeadshot
                        onSelect={(selected) =>
                            handleSelect(character, selected)
                        }
                        selected={selectedCharacter === character}
                        showName={true}
                        showHoverEffect={true}
                        key={character}
                        id={character}
                        size="large"
                        disabled={false}
                    />
                ))}
            </div>
            <div className="flex flex-row justify-center items-center w-full text-white pt-5">
                <PixelButton
                    onClick={handleAccuse}
                    disabled={selectedCharacter === null}
                    height={60}
                    width={200}
                    color="red"
                >
                    Accuse?
                </PixelButton>
            </div>
        </div>
    );
}
