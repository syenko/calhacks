"use client";
import { useRouter } from "next/navigation";
import Chat from "@/components/Chat";

export default function ChatPage() {
    const router = useRouter();

    return <Chat onDone={() => router.push("/")} />;
}
