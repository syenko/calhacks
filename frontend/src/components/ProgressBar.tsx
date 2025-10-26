import { PIXEL_SIZE } from "@/data/constants";

interface ProgressBarProps {
    cur: number;
    max: number;
    width?: number;
    height?: number;
    className?: string;
    fillColor?: string;
    backgroundColor?: string;
}

export default function ProgressBar({
    cur,
    max,
    width = 300,
    height = 40,
    className = "",
    fillColor = "#4ade80", // green
    backgroundColor = "#e5e7eb", // gray
}: ProgressBarProps) {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.max(0, Math.min(100, (cur / max) * 100));

    // Calculate inner dimensions (excluding border)
    const innerWidth = width - PIXEL_SIZE * 2;
    const innerHeight = height - PIXEL_SIZE * 2;

    // Calculate fill width based on progress
    const fillWidth = (innerWidth * clampedProgress) / 100;

    return (
        <div
            className={`relative ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {/* SVG Pixel Art Border Background */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer black border */}
                <rect x="0" y="0" width={width} height={height} fill="black" />

                {/* Background (empty part of progress bar) */}
                <rect
                    x={PIXEL_SIZE}
                    y={PIXEL_SIZE}
                    width={innerWidth}
                    height={innerHeight}
                    fill={backgroundColor}
                />

                {/* Progress fill */}
                {fillWidth > 0 && (
                    <rect
                        x={PIXEL_SIZE}
                        y={PIXEL_SIZE}
                        width={fillWidth}
                        height={innerHeight}
                        fill={fillColor}
                    />
                )}

                {/* Corner decorations - pixel art style */}
                {/* Top left corner */}
                <rect
                    x={PIXEL_SIZE + 2}
                    y={PIXEL_SIZE + 2}
                    width={PIXEL_SIZE}
                    height={PIXEL_SIZE}
                    fill="white"
                    opacity="0.3"
                />

                {/* Top right corner */}
                <rect
                    x={width - PIXEL_SIZE * 2 - 2}
                    y={PIXEL_SIZE + 2}
                    width={PIXEL_SIZE}
                    height={PIXEL_SIZE}
                    fill="white"
                    opacity="0.3"
                />

                {/* Bottom left corner - shadow */}
                <rect
                    x={PIXEL_SIZE + 2}
                    y={height - PIXEL_SIZE * 2 - 2}
                    width={PIXEL_SIZE}
                    height={PIXEL_SIZE}
                    fill="black"
                    opacity="0.2"
                />

                {/* Bottom right corner - shadow */}
                <rect
                    x={width - PIXEL_SIZE * 2 - 2}
                    y={height - PIXEL_SIZE * 2 - 2}
                    width={PIXEL_SIZE}
                    height={PIXEL_SIZE}
                    fill="black"
                    opacity="0.2"
                />
            </svg>

            {/* Progress percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative z-10 text-xs font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    {cur} / {max}
                </span>
            </div>
        </div>
    );
}
