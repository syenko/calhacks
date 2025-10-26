import { useState, useEffect, useRef } from "react";
import { PIXEL_SIZE } from "@/data/constants";

interface DialogBoxProps {
    dialog: string;
    width?: number; // width in pixels
    height?: number; // height in pixels
    maxHeight?: number; // max height in pixels (will scroll if exceeded)
    className?: string;
    streamSpeed?: number; // characters per frame (default 1)
    onStreamingChange?: (isStreaming: boolean) => void; // callback when streaming state changes
}

export default function DialogBox({
    dialog,
    width = 400,
    height = 160,
    maxHeight = 300,
    className = "",
    streamSpeed = 1,
    onStreamingChange,
}: DialogBoxProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [actualHeight, setActualHeight] = useState(height);
    const [showTopGradient, setShowTopGradient] = useState(false);
    const currentIndexRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);

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

    // Measure actual content height (capped at maxHeight)
    useEffect(() => {
        if (textContentRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    // Get the scroll height to account for overflow content
                    const contentHeight =
                        textContentRef.current?.scrollHeight || height;
                    setActualHeight(
                        Math.min(Math.max(height, contentHeight), maxHeight)
                    );
                }
            });

            observer.observe(textContentRef.current);
            return () => observer.disconnect();
        }
    }, [height, maxHeight]);

    // Auto-scroll to bottom when text updates (especially during streaming)
    useEffect(() => {
        if (textContentRef.current) {
            textContentRef.current.scrollTop =
                textContentRef.current.scrollHeight;
            // After auto-scrolling, check if we should show gradient
            // (will be false since we just scrolled to bottom)
            const scrollTop = textContentRef.current.scrollTop;
            setShowTopGradient(scrollTop > 10);
        }
    }, [displayedText]);

    // Handle scroll to show/hide top gradient
    const handleScroll = () => {
        if (textContentRef.current) {
            const scrollTop = textContentRef.current.scrollTop;
            setShowTopGradient(scrollTop > 10);
        }
    };

    // Parse text with asterisks for special formatting
    const parseFormattedText = (text: string) => {
        const parts: React.ReactNode[] = [];
        let currentIndex = 0;
        const regex = /\*([^*]+)\*/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the asterisked part
            if (match.index > currentIndex) {
                parts.push(text.slice(currentIndex, match.index));
            }

            // Add the asterisked part with special styling
            parts.push(
                <span key={match.index} className="text-amber-600 italic">
                    {match[1]}
                </span>
            );

            currentIndex = match.index + match[0].length;
        }

        // Add remaining text after the last asterisked part
        if (currentIndex < text.length) {
            parts.push(text.slice(currentIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    return (
        <div
            ref={containerRef}
            className={`relative text-wrap ${className}`}
            style={{
                width: `${width}px`,
                height: `${actualHeight}px`,
                maxHeight: `${maxHeight}px`,
            }}
        >
            {/* SVG Pixel Art Border Background */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
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
            <div
                ref={textContentRef}
                className="relative z-10 p-8 overflow-y-auto h-full pixel-scrollbar"
                style={{ maxHeight: `${maxHeight}px` }}
                onScroll={handleScroll}
            >
                <p className="text-black text-xl leading-relaxed whitespace-pre-wrap">
                    {parseFormattedText(displayedText)}
                </p>
            </div>

            {/* Top gradient overlay when scrolled */}
            {showTopGradient && (
                <div
                    className="absolute pointer-events-none z-20 transition-opacity duration-200"
                    style={{
                        top: `${PIXEL_SIZE}px`,
                        left: `${PIXEL_SIZE}px`,
                        right: `${PIXEL_SIZE}px`,
                        height: "48px",
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                    }}
                />
            )}

            {/* Hidden scrollbar styles */}
            <style jsx>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .pixel-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .pixel-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    );
}
