import { PIXEL_SIZE } from "@/data/constants";

interface PixelButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    width?: number;
    height?: number;
    className?: string;
    color?: "green" | "red" | "blue" | "yellow";
}

const colorSchemes = {
    green: {
        bg: "#86a889",
        highlight: "#a8c5ab",
        shadow: "#5c7d5f",
    },
    red: {
        bg: "#ef4444",
        highlight: "#f87171",
        shadow: "#b91c1c",
    },
    blue: {
        bg: "#3b82f6",
        highlight: "#60a5fa",
        shadow: "#1d4ed8",
    },
    yellow: {
        bg: "#eab308",
        highlight: "#facc15",
        shadow: "#a16207",
    },
};

export default function PixelButton({
    onClick,
    disabled = false,
    children,
    width = 100,
    height = 80,
    className = "",
    color = "green",
}: PixelButtonProps) {
    const colors = colorSchemes[color];

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative group disabled:cursor-not-allowed ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {/* SVG Button Background */}
            <svg
                className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105 group-active:scale-95 group-disabled:scale-100"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer black border */}
                <rect x="0" y="0" width={width} height={height} fill="black" />

                {/* Button background - color or gray when disabled */}
                <rect
                    x={PIXEL_SIZE}
                    y={PIXEL_SIZE}
                    width={width - PIXEL_SIZE * 2}
                    height={height - PIXEL_SIZE * 2}
                    fill={disabled ? "#6b7280" : colors.bg}
                />

                {/* Highlight effect - top left */}
                <rect
                    x={PIXEL_SIZE}
                    y={PIXEL_SIZE}
                    width={width - PIXEL_SIZE * 2}
                    height={PIXEL_SIZE}
                    fill={disabled ? "#9ca3af" : colors.highlight}
                />
                <rect
                    x={PIXEL_SIZE}
                    y={PIXEL_SIZE}
                    width={PIXEL_SIZE}
                    height={height - PIXEL_SIZE * 2}
                    fill={disabled ? "#9ca3af" : colors.highlight}
                />

                {/* Shadow effect - bottom right */}
                <rect
                    x={PIXEL_SIZE}
                    y={height - PIXEL_SIZE * 2}
                    width={width - PIXEL_SIZE * 2}
                    height={PIXEL_SIZE}
                    fill={disabled ? "#4b5563" : colors.shadow}
                />
                <rect
                    x={width - PIXEL_SIZE * 2}
                    y={PIXEL_SIZE}
                    width={PIXEL_SIZE}
                    height={height - PIXEL_SIZE * 2}
                    fill={disabled ? "#4b5563" : colors.shadow}
                />
            </svg>

            {/* Button text/content */}
            <span
                className={`relative z-10 font-bold text-lg ${
                    disabled ? "text-gray-400" : "text-white"
                }`}
            >
                {children}
            </span>
        </button>
    );
}
