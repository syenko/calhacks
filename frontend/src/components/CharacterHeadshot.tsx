import {
    CharacterId,
    getCharacterImages,
    characterMap,
} from "@/data/characters";
import Image from "next/image";

export default function CharacterHeadshot({
    id,
    showName = false,
    showHoverEffect = false,
}: {
    id: CharacterId;
    showName: boolean;
    showHoverEffect: boolean;
}) {
    return (
        <div className="flex flex-col items-center p-2">
            <div className="border-4 border-black w-[96px] h-[96px]">
                <div className="border-4 border-yellow-500 bg-white/50">
                    <Image
                        src={getCharacterImages(id).headshot}
                        alt={characterMap[id].name}
                        width={96}
                        height={96}
                    />
                </div>
            </div>
            {showName && (
                <div className="text-sm text-white">
                    {characterMap[id].name}
                </div>
            )}
        </div>
    );
}
