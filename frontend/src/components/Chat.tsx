"use client";
import { useState, useEffect } from "react";
import {
    CharacterId,
    characterMap,
    getCharacterImages,
} from "@/data/characters";
import CharacterHeadshot from "@/components/CharacterHeadshot";
import Background from "@/components/Background";
import Image from "next/image";
import DialogBox from "@/components/DialogBox";
import MessageInput from "@/components/MessageInput";
import ProgressBar from "@/components/ProgressBar";
import { useGame } from "@/context/GameContext";
import PixelButton from "@/components/PixelButton";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/data/constants";

interface ResponseType {
    id: CharacterId;
    response: string;
}

export default function Chat({ onDone = () => {} }: { onDone?: () => void }) {
    const {
        selectedCharacters,
        maxTurns,
        individualTurns,
        maxSelected,
        setSelectedCharacters,
        setIndividualTurns,
    } = useGame();

    const [currentCharacter, setCurrentCharacter] = useState<CharacterId>(
        selectedCharacters[0] ?? CharacterId.Daisy
    );
    const [currentDialogIdx, setCurrentDialogIdx] = useState(0);
    const [characterDialogs, setCharacterDialogs] = useState<ResponseType[]>([
        { id: currentCharacter, response: "..." },
    ]);
    const [userDialog, setUserDialog] = useState<string>("");

    const [isTalking, setIsTalking] = useState(false);
    const [turns, setTurns] = useState(
        maxSelected === 1 ? individualTurns.get(currentCharacter) ?? 1 : 1
    );
    const router = useRouter();

    useEffect(() => {
        setCurrentCharacter(
            characterDialogs[currentDialogIdx].id ?? CharacterId.Daisy
        );
    }, [characterDialogs, currentDialogIdx]);

    const handleSend = () => {
        setCurrentDialogIdx(0);

        if (userDialog.length === 0) {
            return;
        }

        // individual date
        if (maxSelected === 1) {
            // fetch to query individual date
            fetch(`${BACKEND_URL}/do_chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    character: selectedCharacters[0],
                    user_input: userDialog,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCharacterDialogs([
                        { id: currentCharacter, response: data.response },
                    ]);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        // group date
        else if (maxSelected === 2) {
            // fetch to query group date
            fetch(`${BACKEND_URL}/do_multicharacter_chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    character_one: selectedCharacters[0],
                    character_two: selectedCharacters[1],
                    user_input: userDialog,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCharacterDialogs(
                        data.responses.map(
                            (response: {
                                character: CharacterId;
                                content: string;
                            }) => ({
                                id: response.character as CharacterId,
                                response: response.content,
                            })
                        )
                    );
                    setCurrentCharacter(
                        data.responses[0].character as CharacterId
                    );
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        setCharacterDialogs([
            { id: currentCharacter, response: "Thinking..." },
        ]);
        if (maxSelected === 1) {
            setIndividualTurns(
                new Map(individualTurns).set(currentCharacter, turns + 1)
            );
        }
        setTurns(turns + 1);
        setUserDialog("");
    };

    const handleBack = () => {
        router.push("/select");
        setSelectedCharacters([]);
    };

    const handleSelect = (_: boolean) => {
        if (currentDialogIdx < characterDialogs.length - 1) {
            setCurrentDialogIdx(currentDialogIdx + 1);
        }
    };

    return (
        <div className="">
            <Background src="/backgrounds/island.png" opacity={100} />
            <div className="flex flex-row gap-2 relative pt-[200px]">
                <div className="flex flex-col gap-2 relative">
                    {/* Other characters that aren't the current character  */}
                    <div className="absolute z-10 left-[400px] -top-[140px] flex flex-row">
                        {selectedCharacters.map((character) =>
                            character != currentCharacter ? (
                                <CharacterHeadshot
                                    onSelect={handleSelect}
                                    selected={false}
                                    size="small"
                                    showName={true}
                                    showHoverEffect={false}
                                    key={character}
                                    id={character}
                                    disabled={false}
                                    showSpeechBubble={
                                        currentDialogIdx <
                                            characterDialogs.length - 1 &&
                                        !isTalking
                                    }
                                />
                            ) : null
                        )}
                    </div>

                    {/* Current character image */}
                    <div
                        className={`absolute -z-10 -top-[140px] transition-transform ${
                            isTalking ? "" : "" // TODO: add back animation later???
                        }`}
                    >
                        <Image
                            className="w-auto h-[250px]"
                            src={getCharacterImages(currentCharacter).top}
                            alt={characterMap[currentCharacter].name}
                            width={150}
                            height={250}
                        />
                    </div>
                    <div className="text-2xl font-bold text-white pl-[150px]">
                        {characterMap[currentCharacter].name}
                    </div>
                    <DialogBox
                        dialog={characterDialogs[currentDialogIdx].response}
                        width={500}
                        height={160}
                        maxHeight={300}
                        onStreamingChange={setIsTalking}
                    />
                    <MessageInput
                        disabled={
                            turns > maxTurns ||
                            currentDialogIdx < characterDialogs.length - 1
                        }
                        value={userDialog}
                        onChange={setUserDialog}
                        onSend={handleSend}
                    />
                    <ProgressBar
                        cur={maxTurns - turns + 1}
                        max={maxTurns}
                        width={500}
                        height={40}
                    />
                    <PixelButton
                        onClick={handleBack}
                        width={maxSelected === 1 ? 100 : 300}
                        height={40}
                        color="red"
                    >
                        {maxSelected === 1
                            ? "Go Back"
                            : "End Date (cannot be undone)"}
                    </PixelButton>
                </div>
            </div>
        </div>
    );
}
