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

export default function Chat({ onDone = () => {} }: { onDone?: () => void }) {
    const {
        selectedCharacters,
        maxTurns,
        individualTurns,
        maxSelected,
        setSelectedCharacters,
        setIndividualTurns,
    } = useGame();

    const [characterDialog, setCharacterDialog] = useState<string>("...");
    const [userDialog, setUserDialog] = useState<string>("");
    const [currentCharacter, setCurrentCharacter] = useState<CharacterId>(
        selectedCharacters[0] ?? CharacterId.Daisy
    );
    const [isTalking, setIsTalking] = useState(false);
    const [turns, setTurns] = useState(
        selectedCharacters.length === 1
            ? individualTurns.get(currentCharacter) ?? 1
            : 1
    );
    const router = useRouter();

    const handleSend = () => {
        if (userDialog.length === 0) {
            return;
        }

        // individual date
        if (maxSelected === 1) {
            // TODO: fetch to query individual date
        }
        // group date
        else if (maxSelected === 2) {
            // TODO: fetch to query group date
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
                    setCharacterDialog(data.responses[0].content);
                    setCurrentCharacter(
                        data.responses[0].character as CharacterId
                    );
                    if (selectedCharacters.length === 1) {
                        setIndividualTurns(
                            new Map(individualTurns).set(
                                currentCharacter,
                                turns + 1
                            )
                        );
                    }
                    setTurns(turns + 1);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        // fetch("https://my-backend.com/ask", {
        //     // TODO: replace with actual backend URL
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ prompt: userDialog }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        setCharacterDialog("Yo");
        // setCurrentCharacter(CharacterId.Sienna);
        if (selectedCharacters.length === 1) {
            setIndividualTurns(
                new Map(individualTurns).set(currentCharacter, turns + 1)
            );
        }
        setTurns(turns + 1);

        // });

        setUserDialog("");
    };

    const handleBack = () => {
        setSelectedCharacters([]);
        router.push("/select");
    };

    return (
        <div className="">
            <Background src="/backgrounds/island.png" opacity={100} />
            <div className="flex flex-row gap-2 relative pt-[200px]">
                {/* Other characters that aren't the current character  */}
                <div className="absolute -z-10 left-[400px] bottom-[400px] flex flex-row">
                    {selectedCharacters.map((character) =>
                        character != currentCharacter ? (
                            <CharacterHeadshot
                                onSelect={() => {}}
                                selected={false}
                                size="small"
                                showName={true}
                                showHoverEffect={false}
                                key={character}
                                id={character}
                                disabled={false}
                            />
                        ) : null
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <div
                        className={`absolute -z-10 bottom-[300px] transition-transform ${
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
                        dialog={characterDialog}
                        width={500}
                        height={160}
                        onStreamingChange={setIsTalking}
                    />
                    <MessageInput
                        disabled={turns > maxTurns}
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
                        width={selectedCharacters.length === 1 ? 100 : 300}
                        height={40}
                        color="red"
                    >
                        {selectedCharacters.length === 1
                            ? "Go Back"
                            : "End Date (cannot be undone)"}
                    </PixelButton>
                </div>
            </div>
        </div>
    );
}
