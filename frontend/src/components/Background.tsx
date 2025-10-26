import Image from "next/image";

interface BackgroundImageProps {
    src: string;
    alt?: string;
    opacity?: number;
    darkenOpacity?: number;
}

export default function Background({
    src,
    alt = "Background",
    opacity = 100,
    darkenOpacity = 50,
}: BackgroundImageProps) {
    return (
        <div className="fixed inset-0 -z-20">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                style={{ opacity: opacity / 100 }}
                priority
            />
            <div
                className="absolute inset-0 bg-black"
                style={{ opacity: darkenOpacity / 100 }}
            />
        </div>
    );
}
