import Background from "@/components/Background";

export default function LosePage() {
    return (
        <div>
            <Background src={"/backgrounds/outside.png"} opacity={100} />
            <div className="text-4xl text-red-500 font-bold">You lose!</div>
        </div>
    );
}
