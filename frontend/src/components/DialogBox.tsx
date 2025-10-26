import { useState, useEffect, useRef } from "react";

interface DialogBoxProps {
    dialog: string;
    width?: number; // width in pixels
    height?: number; // height in pixels
    className?: string;
    streamSpeed?: number; // characters per frame (default 1)
}

export default function DialogBox({
    dialog,
    width = 400,
    height = 160,
    className = "",
    streamSpeed = 1,
}: DialogBoxProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [actualHeight, setActualHeight] = useState(height);
    const currentIndexRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate viewBox to maintain square pixels
    const pixelSize = 6; // base pixel size
    const viewBoxWidth = width;
    const viewBoxHeight = actualHeight;

    useEffect(() => {
        // Reset when dialog changes
        currentIndexRef.current = 0;
        setDisplayedText("");

        if (!dialog) {
            return;
        }

        // Stream text in
        const interval = setInterval(() => {
            currentIndexRef.current += streamSpeed;

            if (currentIndexRef.current >= dialog.length) {
                setDisplayedText(dialog);
                clearInterval(interval);
            } else {
                setDisplayedText(dialog.slice(0, currentIndexRef.current));
            }
        }, 30); // ~33fps

        return () => clearInterval(interval);
    }, [dialog, streamSpeed]);

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
                    x={pixelSize}
                    y={pixelSize}
                    width={viewBoxWidth - pixelSize * 2}
                    height={viewBoxHeight - pixelSize * 2}
                    fill="white"
                />

                {/* Corner decorations - pixel art style */}
                {/* Top left corner */}
                <rect
                    x={pixelSize + 4}
                    y={pixelSize + 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#fbbf24"
                />
                <rect
                    x={pixelSize + 4 + pixelSize}
                    y={pixelSize + 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />
                <rect
                    x={pixelSize + 4}
                    y={pixelSize + 4 + pixelSize}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />

                {/* Top right corner */}
                <rect
                    x={viewBoxWidth - pixelSize * 2 - 4}
                    y={pixelSize + 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#fbbf24"
                />
                <rect
                    x={viewBoxWidth - pixelSize * 3 - 4}
                    y={pixelSize + 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />
                <rect
                    x={viewBoxWidth - pixelSize * 2 - 4}
                    y={pixelSize + 4 + pixelSize}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />

                {/* Bottom left corner */}
                <rect
                    x={pixelSize + 4}
                    y={viewBoxHeight - pixelSize * 2 - 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#fbbf24"
                />
                <rect
                    x={pixelSize + 4 + pixelSize}
                    y={viewBoxHeight - pixelSize * 2 - 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />
                <rect
                    x={pixelSize + 4}
                    y={viewBoxHeight - pixelSize * 3 - 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />

                {/* Bottom right corner */}
                <rect
                    x={viewBoxWidth - pixelSize * 2 - 4}
                    y={viewBoxHeight - pixelSize * 2 - 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#fbbf24"
                />
                <rect
                    x={viewBoxWidth - pixelSize * 3 - 4}
                    y={viewBoxHeight - pixelSize * 2 - 4}
                    width={pixelSize}
                    height={pixelSize}
                    fill="#f59e0b"
                />
                <rect
                    x={viewBoxWidth - pixelSize * 2 - 4}
                    y={viewBoxHeight - pixelSize * 3 - 4}
                    width={pixelSize}
                    height={pixelSize}
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
