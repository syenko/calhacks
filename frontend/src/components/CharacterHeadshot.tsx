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
    showSpeechBubble = false,
    onSelect = (selected: boolean) => {},
    selected = false,
    disabled = false,
}: {
    id: CharacterId;
    size?: "small" | "large";
    showName?: boolean;
    showHoverEffect?: boolean;
    showSpeechBubble?: boolean;
    onSelect: (selected: boolean) => void;
    selected: boolean;
    disabled: boolean;
}) {
    const dimensions = size === "small" ? 96 : 192;

    const handleClick = () => {
        console.log("HEYYYY");
        if ((showHoverEffect || showSpeechBubble) && !disabled) {
            onSelect(!selected);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center p-2 ${
                showSpeechBubble ? "cursor-pointer!" : ""
            } ${disabled ? "opacity-50" : ""}`}
        >
            <div
                className={`relative ${
                    size === "small" ? "border-4 " : "border-8 "
                } ${
                    (showHoverEffect || showSpeechBubble) && !disabled
                        ? selected
                            ? "border-yellow-600"
                            : "hover:border-yellow-600"
                        : ""
                } border-black`}
                style={{ width: `${dimensions}px`, height: `${dimensions}px` }}
            >
                {/* Speech bubble indicator */}
                {showSpeechBubble && (
                    <div
                        className="absolute -top-4 -left-4 z-10"
                        style={{ width: "40px", height: "32px" }}
                    >
                        {/* SVG Speech Bubble */}
                        <svg
                            width="40"
                            height="32"
                            viewBox="0 0 40 32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Outer black border */}
                            <rect
                                x="4"
                                y="0"
                                width="32"
                                height="24"
                                fill="black"
                            />

                            {/* Inner white background */}
                            <rect
                                x="6"
                                y="2"
                                width="28"
                                height="20"
                                fill="white"
                            />

                            {/* Three dots */}
                            <rect
                                x="12"
                                y="10"
                                width="4"
                                height="4"
                                fill="black"
                            />
                            <rect
                                x="18"
                                y="10"
                                width="4"
                                height="4"
                                fill="black"
                            />
                            <rect
                                x="24"
                                y="10"
                                width="4"
                                height="4"
                                fill="black"
                            />
                        </svg>
                    </div>
                )}
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
