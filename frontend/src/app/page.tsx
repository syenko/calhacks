"use client";
import Background from "@/components/Background";
import PixelButton from "@/components/PixelButton";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div>
            <Background src={"/backgrounds/darkisland.png"} opacity={100} />
            <div className="flex flex-col items-center justify-center h-screen text-white">
                <div
                    className="text-5xl text-white leading-10"
                    style={{ fontFamily: "PixelScript" }}
                >
                    Love Island
                </div>
                <div className="text-4xl py-10">To Die For...</div>
                <PixelButton
                    onClick={() => router.push("/intro")}
                    disabled={false}
                    height={60}
                    width={200}
                    color="green"
                >
                    Click to Start
                </PixelButton>
            </div>
        </div>
    );
}
