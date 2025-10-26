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

export default function Chat() {
    const [characterDialog, setCharacterDialog] = useState<string>(
        "Hello! ajsd;lfkjasd ;kfj;laksdjf; laskjdfl asdfkj  asdjf;as asd adsfas asdkjf;askdjf;"
    );
    const [userDialog, setUserDialog] = useState<string>("");
    const [currentCharacter, setCurrentCharacter] = useState<CharacterId>(
        CharacterId.Alice
    );
    const [characters, setCharacters] = useState<CharacterId[]>([
        CharacterId.Alice,
        CharacterId.Bob,
    ]);
    const [isTalking, setIsTalking] = useState(false);

    const handleSend = () => {
        if (userDialog.length === 0) {
            return;
        }

        fetch("https://my-backend.com/ask", {
            // TODO: replace with actual backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userDialog }),
        })
            .then((res) => res.json())
            .then((data) => setCharacterDialog(data));

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
                            <CharacterHeadshot key={character} id={character} />
                        ) : null
                    )}
                </div>
                <div
                    className={`absolute -z-10 bottom-[100px] transition-transform ${
                        isTalking ? "" : "" // TODO: add back animation later???
                    }`}
                >
                    <Image
                        src={getCharacterImages(currentCharacter).fullbody}
                        alt={characterMap[currentCharacter].name}
                        width={200}
                        height={400}
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
                    <ProgressBar progressState={50} width={500} height={40} />
                </div>
            </div>
        </div>
    );
}
