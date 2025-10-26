import { CharacterId } from "@/data/characters";
import Background from "@/components/Background";
import CharacterHeadshot from "@/components/CharacterHeadshot";

export default function Select() {
    return (
        <div>
            <Background src="/backgrounds/island.png" opacity={100} />
            <div className="text-4xl text-white font-bold">Pick a date:</div>
            <div className="flex flex-row">
                {Object.values(CharacterId).map((character) => (
                    <CharacterHeadshot
                        showName={true}
                        showHoverEffect={true}
                        key={character}
                        id={character}
                        size="large"
                    />
                ))}
            </div>
        </div>
    );
}
