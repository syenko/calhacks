import { CharacterId } from "@/data/characters";
import Background from "@/components/Background";
import CharacterHeadshot from "@/components/CharacterHeadshot";

export default function Select() {
    return (
        <div>
            <Background src="/backgrounds/island.png" opacity={100} />
            <div className="flex flex-row justify-center items-center relative h-screen w-screen">
                <div className="flex flex-row gap-5">
                    {Object.values(CharacterId).map((character) => (
                        <CharacterHeadshot key={character} id={character} />
                    ))}
                </div>
            </div>
        </div>
    );
}
