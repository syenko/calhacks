import { useState, useEffect, useRef } from "react";
import { PIXEL_SIZE } from "@/data/constants";

interface DialogBoxProps {
    dialog: string;
    width?: number; // width in pixels
    height?: number; // height in pixels
    className?: string;
    streamSpeed?: number; // characters per frame (default 1)
    onStreamingChange?: (isStreaming: boolean) => void; // callback when streaming state changes
}

export default function DialogBox({
    dialog,
    width = 400,
    height = 160,
    className = "",
    streamSpeed = 1,
    onStreamingChange,
}: DialogBoxProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [actualHeight, setActualHeight] = useState(height);
    const currentIndexRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate viewBox to maintain square pixels
    const viewBoxWidth = width;
    const viewBoxHeight = actualHeight;

    useEffect(() => {
        // Reset when dialog changes
        currentIndexRef.current = 0;
        setDisplayedText("");

        if (!dialog) {
            onStreamingChange?.(false);
            return;
        }

        // Start streaming
        onStreamingChange?.(true);

        // Stream text in
        const interval = setInterval(() => {
            currentIndexRef.current += streamSpeed;

            if (currentIndexRef.current >= dialog.length) {
                setDisplayedText(dialog);
                onStreamingChange?.(false); // Stop streaming
                clearInterval(interval);
            } else {
                setDisplayedText(dialog.slice(0, currentIndexRef.current));
            }
        }, 30); // ~33fps

        return () => {
            clearInterval(interval);
            onStreamingChange?.(false);
        };
    }, [dialog, streamSpeed, onStreamingChange]);

    // Measure actual content height
    useEffect(() => {
        if (containerRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const contentHeight = entry.contentRect.height;
                    setActualHeight(Math.max(height, contentHeight));
                }
            });

            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [height]);

    return (
        <div
            ref={containerRef}
            className={`relative text-wrap ${className}`}
            style={{ width: `${width}px`, minHeight: `${height}px` }}
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

            {/* Dialog text content */}
            <div className="relative z-10 p-8">
                <p className="text-black text-xl leading-relaxed">
                    {displayedText}
                </p>
            </div>
        </div>
    );
}
