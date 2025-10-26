import {
    CharacterId,
    getCharacterImages,
    characterMap,
} from "@/data/characters";
import Image from "next/image";

export default function CharacterHeadshot({ id }: { id: CharacterId }) {
    return (
        <div className="border-4 border-black w-24 h-24">
            <div className="border-4 border-yellow-500 bg-white/50">
                <Image
                    src={getCharacterImages(id).headshot}
                    alt={characterMap[id].name}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
}
