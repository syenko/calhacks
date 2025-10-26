"use client";
import { useState, useEffect } from "react";
import NotesPanel from "@/components/NotesPanel";
import PixelButton from "@/components/PixelButton";

export default function PageWithNotes({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    // Keyboard shortcut to toggle notes (N key)
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only trigger if not typing in an input/textarea
            if (
                e.key === "n" &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.altKey &&
                !(e.target instanceof HTMLInputElement) &&
                !(e.target instanceof HTMLTextAreaElement)
            ) {
                setIsNotesOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <>
            {/* Notes toggle button - floating in top right */}
            <PixelButton
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                height={60}
                width={isNotesOpen ? 200 : 100}
                color="yellow"
                className="absolute! top-6 right-6 z-70"
            >
                {isNotesOpen ? "Close Notes" : "Notes"}
            </PixelButton>

            {/* Main content */}
            {children}

            {/* Notes panel overlay */}
            <NotesPanel
                isOpen={isNotesOpen}
                onClose={() => setIsNotesOpen(false)}
            />
        </>
    );
}
