"use client";
import { useRouter } from "next/navigation";
import Chat from "@/components/Chat";
import PageWithNotes from "@/components/PageWithNotes";

export default function ChatPage() {
    const router = useRouter();

    return (
        <PageWithNotes>
            <Chat onDone={() => router.push("/")} />
        </PageWithNotes>
    );
}
