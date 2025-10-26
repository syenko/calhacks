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

export default function Chat() {
    const [characterDialog, setCharacterDialog] = useState<string>(
        "Hello! ajsd;lfkjasd ;kfj;laksdjf; laskjdfl;"
    );
    const [userDialog, setUserDialog] = useState<string>("");
    const [currentCharacter, setCurrentCharacter] = useState<CharacterId>(
        CharacterId.Alice
    );
    const [characters, setCharacters] = useState<CharacterId[]>([
        CharacterId.Alice,
        CharacterId.Bob,
    ]);

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
            <div className="flex flex-col gap-2 relative">
                {/* Other characters that aren't the current character  */}
                <div className="absolute -z-10 left-[400px] top-[200px]">
                    {characters.map((character) =>
                        character != currentCharacter ? (
                            <CharacterHeadshot key={character} id={character} />
                        ) : null
                    )}
                </div>
                <div>
                    <div className="relative -z-10 top-[200px]">
                        <Image
                            src={getCharacterImages(currentCharacter).fullbody}
                            alt={characterMap[currentCharacter].name}
                            width={200}
                            height={400}
                        />
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {characterMap[currentCharacter].name}
                    </div>
                    <DialogBox
                        dialog={characterDialog}
                        width={500}
                        height={160}
                    />
                    <div className="pt-3">
                        <MessageInput
                            disabled={userDialog.length === 0}
                            value={userDialog}
                            onChange={setUserDialog}
                            onSend={handleSend}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
