"use client";
import { useGame } from "@/context/GameContext";
import { PIXEL_SIZE } from "@/data/constants";

interface NotesPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotesPanel({ isOpen, onClose }: NotesPanelProps) {
    const { notes, setNotes } = useGame();

    if (!isOpen) return null;

    const width = 400;
    const height = 600;
    const viewBoxWidth = width;
    const viewBoxHeight = height;

    return (
        <div className="fixed right-0 top-0 h-screen flex items-center justify-end z-50 p-8">
            {/* Backdrop overlay */}
            <div
                className="fixed inset-0 bg-black/30 -z-10"
                onClick={onClose}
            />

            {/* Notes Panel */}
            <div
                className="relative"
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                {/* SVG Pixel Art Border Background */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer black border */}
                    <rect
                        x="0"
                        y="0"
                        width={viewBoxWidth}
                        height={viewBoxHeight}
                        fill="black"
                    />

                    {/* Inner white background */}
                    <rect
                        x={PIXEL_SIZE}
                        y={PIXEL_SIZE}
                        width={viewBoxWidth - PIXEL_SIZE * 2}
                        height={viewBoxHeight - PIXEL_SIZE * 2}
                        fill="white"
                    />

                    {/* Corner decorations - pixel art style */}
                    {/* Top left corner */}
                    <rect
                        x={PIXEL_SIZE + 4}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#fbbf24"
                    />
                    <rect
                        x={PIXEL_SIZE + 4 + PIXEL_SIZE}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />
                    <rect
                        x={PIXEL_SIZE + 4}
                        y={PIXEL_SIZE + 4 + PIXEL_SIZE}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />

                    {/* Top right corner */}
                    <rect
                        x={viewBoxWidth - PIXEL_SIZE * 2 - 4}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#fbbf24"
                    />
                    <rect
                        x={viewBoxWidth - PIXEL_SIZE * 3 - 4}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />
                    <rect
                        x={viewBoxWidth - PIXEL_SIZE * 2 - 4}
                        y={PIXEL_SIZE + 4 + PIXEL_SIZE}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />

                    {/* Bottom left corner */}
                    <rect
                        x={PIXEL_SIZE + 4}
                        y={viewBoxHeight - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#fbbf24"
                    />
                    <rect
                        x={PIXEL_SIZE + 4 + PIXEL_SIZE}
                        y={viewBoxHeight - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />
                    <rect
                        x={PIXEL_SIZE + 4}
                        y={viewBoxHeight - PIXEL_SIZE * 3 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />

                    {/* Bottom right corner */}
                    <rect
                        x={viewBoxWidth - PIXEL_SIZE * 2 - 4}
                        y={viewBoxHeight - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#fbbf24"
                    />
                    <rect
                        x={viewBoxWidth - PIXEL_SIZE * 3 - 4}
                        y={viewBoxHeight - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />
                    <rect
                        x={viewBoxWidth - PIXEL_SIZE * 2 - 4}
                        y={viewBoxHeight - PIXEL_SIZE * 3 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#f59e0b"
                    />
                </svg>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-black text-2xl font-bold">Notes</h2>
                        <button
                            onClick={onClose}
                            className="text-black hover:text-gray-600 text-2xl font-bold"
                        >
                            x
                        </button>
                    </div>

                    {/* Notes textarea */}
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Type your notes here..."
                        className="flex-1 w-full p-4 text-black text-lg border-2 border-gray-300 resize-none focus:outline-none focus:border-amber-500"
                    />
                </div>
            </div>
        </div>
    );
}
