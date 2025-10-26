"use client";
import {
    CharacterId,
    getCharacterImages,
    characterMap,
} from "@/data/characters";
import Image from "next/image";
import { useState } from "react";

export default function CharacterHeadshot({
    id,
    size = "small",
    showName = false,
    showHoverEffect = false,
}: {
    id: CharacterId;
    size?: "small" | "large";
    showName?: boolean;
    showHoverEffect?: boolean;
}) {
    const dimensions = size === "small" ? 96 : 192;
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (showHoverEffect) {
            setIsSelected(!isSelected);
        }
    };

    return (
        <div onClick={handleClick} className="flex flex-col items-center p-2">
            <div
                className={`${size === "small" ? "border-4 " : "border-8 "} ${
                    showHoverEffect
                        ? isSelected
                            ? "border-yellow-600"
                            : "hover:border-yellow-600"
                        : ""
                } border-black`}
                style={{ width: `${dimensions}px`, height: `${dimensions}px` }}
            >
                <div
                    className={`w-full h-full ${
                        size === "small" ? "border-4 " : "border-6 "
                    } border-yellow-500 bg-white/50 p-1`}
                >
                    <Image
                        src={getCharacterImages(id).headshot}
                        alt={characterMap[id].name}
                        width={dimensions}
                        height={dimensions}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            {showName && (
                <div
                    className={`${
                        size === "large" ? "text-xl" : "text-sm"
                    } text-white`}
                >
                    {characterMap[id].name}
                </div>
            )}
        </div>
    );
}
