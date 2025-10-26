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
import DialogBox from "@/components/DialogBox";
import PixelButton from "@/components/PixelButton";
import { useRouter } from "next/navigation";

interface DialogEntry {
    id: CharacterId | null;
    response: string;
    background: string;
}

// Define your static dialog sequence here
const DIALOG_SEQUENCE: DialogEntry[] = [
    {
        id: CharacterId.Host,
        response:
            "Alright, Islanders, welcome! I'm Andy, your host. Over the next few weeks, you’ll be living, laughing, and maybe falling for someone right here in this villa.",
        background: "/backgrounds/island.png",
    },
    {
        id: CharacterId.Host,
        response:
            "But first, go ahead and introduce yourselves. Let’s see who we’ve got in the house.",
        background: "/backgrounds/island.png",
    },

    {
        id: CharacterId.Daisy,
        response:
            "Hey, I’m Daisy. I study Fine Arts, so I’m used to more… quiet vibes. But this? This is a whole new kind of adventure. Nice to meet everyone!",
        background: "/backgrounds/island.png",
    },
    {
        id: CharacterId.Sienna,
        response:
            "Hi, I’m Sienna. I work hard, play hard, and I’m definitely here to make things interesting. You’ll see.",
        background: "/backgrounds/island.png",
    },
    {
        id: CharacterId.Grace,
        response:
            "I’m Grace. I know Daisy from college — we’ve survived group projects together, so I think I can survive this too. Looking forward to meeting all of you!",
        background: "/backgrounds/island.png",
    },
    {
        id: CharacterId.Drew,
        response:
            "Hey, I’m Drew. I’ve known Daisy for ages, so it’s nice to see a familiar face here. I’m curious to see what everyone’s like off the campus vibe.",
        background: "/backgrounds/island.png",
    },
    {
        id: CharacterId.Hunter,
        response:
            "Hunter here. Grew up in Silicon Valley, obsessed with competition — whether it’s finance or dating. Looking forward to meeting all of you and seeing how this plays out.",
        background: "/backgrounds/island.png",
    },

    {
        id: CharacterId.Host,
        response:
            "Perfect, everyone’s met! Grab a drink, chat, and start getting to know each other. This villa is officially yours for the next few weeks.",
        background: "/backgrounds/island.png",
    },
    {
        id: null,
        response: "Later that night...",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: CharacterId.Host,
        response:
            "Islanders, gather immediately. Production has asked me to deliver an emergency announcement.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: CharacterId.Host,
        response:
            "Hunter has been found dead. Paramedics have confirmed it. This is now a police matter.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: CharacterId.Host,
        response:
            "You are NOT being removed from the island. The show will continue under revised protocol. You will still go on dates, challenges, and eliminations as scheduled.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: CharacterId.Host,
        response:
            "Detectives will be reviewing footage and will observe proceedings remotely. You are not to leave the island, but you may move about as normal inside the show structure.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: CharacterId.Host,
        response:
            "You will have time to talk and process throughout the week. For tonight, I ask you to return to your rooms and get some rest.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: null,
        response:
            "All contestants must continue the show schedule — including you.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: null,
        response:
            "Your only chances to interrogate the others will be during mandatory individual dates and two group outings.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: null,
        response:
            "Someone here murdered Hunter. Keep playing, keep smiling — and start digging. Look for alibis and inconsistencies in their stories. The players may know more than they are letting on.",
        background: "/backgrounds/fireplace.png",
    },
    {
        id: null,
        response: "The investigation begins tomorrow.",
        background: "/backgrounds/fireplace.png",
    },
];

export default function StaticDialog() {
    const router = useRouter();

    const [currentDialogIdx, setCurrentDialogIdx] = useState(0);
    const [isTalking, setIsTalking] = useState(false);

    const currentDialog = DIALOG_SEQUENCE[currentDialogIdx];
    const currentCharacter = currentDialog.id;

    const handleNext = () => {
        // Wait for streaming to finish before allowing next
        if (isTalking) return;

        if (currentDialogIdx < DIALOG_SEQUENCE.length - 1) {
            setCurrentDialogIdx(currentDialogIdx + 1);
        } else {
            router.push("/select");
        }
    };

    return (
        <div className="">
            <Background src={currentDialog.background} opacity={100} />
            <div className="flex flex-row gap-2 relative pt-[200px]">
                <div className="flex flex-col gap-2 relative">
                    {/* Current character image */}
                    {currentCharacter && (
                        <>
                            <div className="absolute -z-10 -top-[140px]">
                                <Image
                                    className="w-auto h-[250px]"
                                    src={
                                        getCharacterImages(currentCharacter).top
                                    }
                                    alt={characterMap[currentCharacter].name}
                                    width={150}
                                    height={250}
                                />
                            </div>

                            <div className="text-2xl font-bold text-white pl-[170px]">
                                {characterMap[currentCharacter].name}
                            </div>
                        </>
                    )}

                    <DialogBox
                        dialog={currentDialog.response}
                        width={500}
                        height={160}
                        maxHeight={300}
                        onStreamingChange={setIsTalking}
                    />

                    {/* Next button instead of MessageInput */}
                    <PixelButton
                        onClick={handleNext}
                        width={500}
                        height={60}
                        disabled={isTalking}
                    >
                        {currentDialogIdx >= DIALOG_SEQUENCE.length - 1
                            ? "Get Started"
                            : "Next"}
                    </PixelButton>
                </div>
            </div>
        </div>
    );
}
