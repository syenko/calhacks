import { PIXEL_SIZE } from "@/data/constants";

interface MessageInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    width?: number;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function MessageInput({
    value,
    onChange,
    onSend,
    width = 500,
    placeholder = "Type your message...",
    className = "",
    disabled = false,
}: MessageInputProps) {
    const height = 80;
    const buttonWidth = 100;

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    return (
        <div className={`relative flex gap-4 ${className}`}>
            {/* Input Container with Pixel Art Border */}
            <div
                className="relative"
                style={{
                    width: `${width - buttonWidth - 16}px`,
                    height: `${height}px`,
                }}
            >
                {/* SVG Pixel Art Border Background */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${width - buttonWidth - 16} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer black border */}
                    <rect
                        x="0"
                        y="0"
                        width={width - buttonWidth - 16}
                        height={height}
                        fill="black"
                    />

                    {/* Inner white background */}
                    <rect
                        x={PIXEL_SIZE}
                        y={PIXEL_SIZE}
                        width={width - buttonWidth - 16 - PIXEL_SIZE * 2}
                        height={height - PIXEL_SIZE * 2}
                        fill="white"
                    />

                    {/* Corner decorations */}
                    {/* Top left */}
                    <rect
                        x={PIXEL_SIZE + 4}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#60a5fa"
                    />
                    <rect
                        x={PIXEL_SIZE + 4 + PIXEL_SIZE}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#3b82f6"
                    />

                    {/* Top right */}
                    <rect
                        x={width - buttonWidth - 16 - PIXEL_SIZE * 2 - 4}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#60a5fa"
                    />
                    <rect
                        x={width - buttonWidth - 16 - PIXEL_SIZE * 3 - 4}
                        y={PIXEL_SIZE + 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#3b82f6"
                    />

                    {/* Bottom left */}
                    <rect
                        x={PIXEL_SIZE + 4}
                        y={height - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#60a5fa"
                    />
                    <rect
                        x={PIXEL_SIZE + 4 + PIXEL_SIZE}
                        y={height - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#3b82f6"
                    />

                    {/* Bottom right */}
                    <rect
                        x={width - buttonWidth - 16 - PIXEL_SIZE * 2 - 4}
                        y={height - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#60a5fa"
                    />
                    <rect
                        x={width - buttonWidth - 16 - PIXEL_SIZE * 3 - 4}
                        y={height - PIXEL_SIZE * 2 - 4}
                        width={PIXEL_SIZE}
                        height={PIXEL_SIZE}
                        fill="#3b82f6"
                    />
                </svg>

                {/* Input field */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="relative z-10 w-full h-full px-6 bg-transparent text-black text-lg outline-none"
                />
            </div>

            {/* Pixel Art Send Button */}
            <button
                onClick={onSend}
                disabled={disabled}
                className="relative group disabled:cursor-not-allowed"
                style={{ width: `${buttonWidth}px`, height: `${height}px` }}
            >
                {/* SVG Button Background */}
                <svg
                    className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105 group-active:scale-95 group-disabled:scale-100"
                    viewBox={`0 0 ${buttonWidth} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer black border */}
                    <rect
                        x="0"
                        y="0"
                        width={buttonWidth}
                        height={height}
                        fill="black"
                    />

                    {/* Button background - muted green or gray when disabled */}
                    <rect
                        x={PIXEL_SIZE}
                        y={PIXEL_SIZE}
                        width={buttonWidth - PIXEL_SIZE * 2}
                        height={height - PIXEL_SIZE * 2}
                        fill={disabled ? "#6b7280" : "#86a889"}
                    />

                    {/* Highlight effect - top left */}
                    <rect
                        x={PIXEL_SIZE}
                        y={PIXEL_SIZE}
                        width={buttonWidth - PIXEL_SIZE * 2}
                        height={PIXEL_SIZE}
                        fill={disabled ? "#9ca3af" : "#a8c5ab"}
                    />
                    <rect
                        x={PIXEL_SIZE}
                        y={PIXEL_SIZE}
                        width={PIXEL_SIZE}
                        height={height - PIXEL_SIZE * 2}
                        fill={disabled ? "#9ca3af" : "#a8c5ab"}
                    />

                    {/* Shadow effect - bottom right */}
                    <rect
                        x={PIXEL_SIZE}
                        y={height - PIXEL_SIZE * 2}
                        width={buttonWidth - PIXEL_SIZE * 2}
                        height={PIXEL_SIZE}
                        fill={disabled ? "#4b5563" : "#5c7d5f"}
                    />
                    <rect
                        x={buttonWidth - PIXEL_SIZE * 2}
                        y={PIXEL_SIZE}
                        width={PIXEL_SIZE}
                        height={height - PIXEL_SIZE * 2}
                        fill={disabled ? "#4b5563" : "#5c7d5f"}
                    />
                </svg>

                {/* Button text */}
                <span
                    className={`relative z-10 font-bold text-lg ${
                        disabled ? "text-gray-400" : "text-white"
                    }`}
                >
                    SEND
                </span>
            </button>
        </div>
    );
}
