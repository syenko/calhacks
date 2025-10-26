import Background from "@/components/Background";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Background src={"/backgrounds/outside.png"} opacity={100} />
            <div className="text-4xl text-white font-bold">
                <Link href="/select">Start</Link>
            </div>
        </div>
    );
}
