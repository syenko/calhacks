"use client";
import { useState } from "react";
import {
    CharacterId,
    characterMap,
    getCharacterImages,
} from "@/data/characters";
import CharacterHeadshot from "@/components/CharacterHeadshot";
import Background from "@/components/Background";
import Image from "next/image";
import DialogBox from "./DialogBox";
import MessageInput from "./MessageInput";
import ProgressBar from "./ProgressBar";

export default function Chat({
    characters = [CharacterId.Daisy, CharacterId.Sienna],
    maxTurns = 10,
    onDone = () => {},
}: {
    characters: CharacterId[];
    maxTurns: number;
    onDone: () => void;
}) {
    const [characterDialog, setCharacterDialog] = useState<string>(
        "Hello! ajsd;lfkjasd ;kfj;laksdjf; laskjdfl asdfkj  asdjf;as asd adsfas asdkjf;askdjf;"
    );
    const [userDialog, setUserDialog] = useState<string>("");
    const [currentCharacter, setCurrentCharacter] = useState<CharacterId>(
        CharacterId.Daisy
    );
    const [isTalking, setIsTalking] = useState(false);
    const [turns, setTurns] = useState(0);

    const handleSend = () => {
        if (userDialog.length === 0) {
            return;
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
        setCurrentCharacter(CharacterId.Sienna);
        setTurns(turns + 1);
        if (turns >= maxTurns) {
            onDone();
        }
        // });

        setUserDialog("");
    };

    return (
        <div className="">
            <Background src="/backgrounds/island.png" opacity={100} />
            <div className="flex flex-col gap-2 relative pt-[200px]">
                {/* Other characters that aren't the current character  */}
                <div className="absolute -z-10 left-[400px] bottom-[400px]">
                    {characters.map((character) =>
                        character != currentCharacter ? (
                            <CharacterHeadshot
                                showName={true}
                                showHoverEffect={false}
                                key={character}
                                id={character}
                            />
                        ) : null
                    )}
                </div>
                <div
                    className={`absolute -z-10 bottom-[250px] transition-transform ${
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
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold text-white">
                        {characterMap[currentCharacter].name}
                    </div>
                    <DialogBox
                        dialog={characterDialog}
                        width={500}
                        height={160}
                        onStreamingChange={setIsTalking}
                    />
                    <MessageInput
                        disabled={userDialog.length === 0}
                        value={userDialog}
                        onChange={setUserDialog}
                        onSend={handleSend}
                    />
                    <ProgressBar
                        progressState={(turns / maxTurns) * 100}
                        width={500}
                        height={40}
                    />
                </div>
            </div>
        </div>
    );
}
