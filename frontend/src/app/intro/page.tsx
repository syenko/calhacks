import Background from "@/components/Background";
import StaticDialog from "@/components/StaticDialog";

export default function IntroPage() {
    return (
        <div>
            <Background src={"/backgrounds/outside.png"} opacity={100} />
            <StaticDialog />
        </div>
    );
}
