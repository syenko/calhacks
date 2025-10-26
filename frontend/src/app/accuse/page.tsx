"use client";
import Background from "@/components/Background";
import { CharacterId, mainCharacters } from "@/data/characters";
import CharacterHeadshot from "@/components/CharacterHeadshot";
import PixelButton from "@/components/PixelButton";
import { useState } from "react";
import PageWithNotes from "@/components/PageWithNotes";
import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";

export default function AccusePage() {
    const [selectedCharacter, setSelectedCharacter] =
        useState<CharacterId | null>(null);
    const { killer } = useGame();

    const router = useRouter();

    const handleSelect = (character: CharacterId, selected: boolean) => {
        if (selected) {
            setSelectedCharacter(character);
        } else {
            setSelectedCharacter(null);
        }
    };

    const handleAccuse = () => {
        if (selectedCharacter == killer) {
            router.push("/win");
        } else {
            router.push("/lose");
        }
    };

    return (
        <PageWithNotes>
            <div>
                <Background src={"/backgrounds/outside.png"} opacity={100} />
                <div className="text-4xl text-white font-bold">
                    Accuse the killer?
                </div>
                <div className="flex flex-row">
                    {mainCharacters.map((character) => (
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
        </PageWithNotes>
    );
}
