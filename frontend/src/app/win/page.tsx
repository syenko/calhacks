import Background from "@/components/Background";

export default function WinPage() {
    return (
        <div>
            <Background src={"/backgrounds/outside.png"} opacity={100} />
            <div className="text-4xl text-white font-bold">You win!</div>
        </div>
    );
}
