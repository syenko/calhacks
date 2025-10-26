"use client";
import { CharacterId, mainCharacters } from "@/data/characters";
import Background from "@/components/Background";
import CharacterHeadshot from "@/components/CharacterHeadshot";
import PixelButton from "@/components/PixelButton";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import {
    MAX_GROUP_TURNS,
    MAX_GROUP_DATES,
    BACKEND_URL,
} from "@/data/constants";

export default function Select() {
    const {
        selectedCharacters,
        setSelectedCharacters,
        maxSelected,
        setMaxSelected,
        individualTurns,
        maxTurns,
        setMaxTurns,
        setGroupDates,
        groupDates,
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

    function showStage2Button() {
        if (maxSelected === 1) {
            for (const character of mainCharacters) {
                if ((individualTurns.get(character) ?? 0) == 1) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function goToStage2() {
        setMaxSelected(2);
        setMaxTurns(MAX_GROUP_TURNS);
    }

    function handleDateSelect() {
        if (maxSelected === 1) {
            // fetch to start individual chat
            fetch(`${BACKEND_URL}/start_chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    character: selectedCharacters[0],
                }),
            });
        } else if (maxSelected === 2) {
            // fetch to start group chat
            fetch(`${BACKEND_URL}/start_multicharacter_chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    character_one: selectedCharacters[0],
                    character_two: selectedCharacters[1],
                }),
            });
            setGroupDates([...groupDates, selectedCharacters]);
        }
        router.push("/chat");
    }

    function handleAccuse() {
        router.push("/accuse");
    }

    return (
        <div>
            <Background
                src={
                    maxSelected === 1
                        ? "/backgrounds/room.png"
                        : "/backgrounds/fireplace.png"
                }
                opacity={100}
            />
            <div className="text-4xl text-white font-bold">
                {maxSelected === 1
                    ? "Pick a date:"
                    : `Pick two people for a group date (${groupDates.length}/${MAX_GROUP_DATES} dates)`}
            </div>
            <div className="flex flex-row">
                {mainCharacters.map((character) => (
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
                            (maxSelected === 1 &&
                                (individualTurns.get(character) ?? 0) >=
                                    maxTurns) ||
                            (maxSelected == 2 &&
                                groupDates.length >= MAX_GROUP_DATES)
                        }
                    />
                ))}
            </div>
            <div className="flex flex-row justify-between items-center w-full text-white">
                <div className="font-bold">
                    {selectedCharacters.length} / {maxSelected} selected
                </div>
                <div className="flex flex-row gap-2">
                    <PixelButton
                        onClick={handleDateSelect}
                        disabled={selectedCharacters.length != maxSelected}
                        height={60}
                    >
                        Go
                    </PixelButton>
                    {showStage2Button() && (
                        <PixelButton
                            height={60}
                            width={200}
                            color="blue"
                            onClick={goToStage2}
                        >
                            Go to Group Dates
                        </PixelButton>
                    )}
                    {maxSelected === 2 &&
                        groupDates.length >= MAX_GROUP_DATES && (
                            <PixelButton
                                height={60}
                                width={150}
                                color="red"
                                onClick={handleAccuse}
                            >
                                Accuse
                            </PixelButton>
                        )}
                </div>
            </div>
        </div>
    );
}
