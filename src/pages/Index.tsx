import {useEffect, useState} from "react";
import {ExternalLink, RefreshCw, WifiOff} from "lucide-react";
import {Button} from "@/components/ui/button";

const Index = () => {
    const [stage, setStage] = useState(0); // 0=idle, 1=waiting, 2=next-steps
    const [online, setOnline] = useState(() => navigator.onLine);

    useEffect(() => {
        const root = document.documentElement;
        const mq = matchMedia("(prefers-color-scheme: dark)");
        const setDark = (d: boolean) => root.classList.toggle("dark", d);
        setDark(mq.matches);

        const onMsg = (e: MessageEvent) =>
            e.data?.type === "codepal:theme" && setDark(e.data.theme === "dark");
        const onMq = (e: MediaQueryListEvent) => setDark(e.matches);
        const onOn = () => setOnline(true);
        const onOff = () => setOnline(false);

        addEventListener("message", onMsg);
        mq.addEventListener("change", onMq);
        addEventListener("online", onOn);
        addEventListener("offline", onOff);
        const t1 = setTimeout(() => setStage((s) => Math.max(s, 1)), 15_000);
        const t2 = setTimeout(() => setStage(2), 45_000);

        return () => {
            removeEventListener("message", onMsg);
            mq.removeEventListener("change", onMq);
            removeEventListener("online", onOn);
            removeEventListener("offline", onOff);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const reload = () => location.reload();
    const newTab = () => open(location.href, "_blank", "noopener,noreferrer");

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
            <div className="flex flex-col items-center gap-6 text-center">
                <div className="relative h-12 w-12">
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-brand via-brand-accent to-highlight opacity-80 blur-md motion-safe:animate-pulse"/>
                    <div
                        className="relative h-full w-full rounded-full bg-gradient-to-br from-brand via-brand-accent to-highlight"/>
                </div>

                <div>
                    <h1 className="text-base font-medium">{online ? "Building your app" : "You're offline"}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {online ? "This usually takes a few seconds." : "We'll resume once you're back."}
                    </p>
                </div>

                <div className="relative h-px w-40 overflow-hidden rounded-full bg-border" aria-hidden>
                    {online && (
                        <div
                            className="absolute inset-y-0 w-1/3 bg-foreground/50 motion-safe:animate-[loader-shimmer_1.8s_ease-in-out_infinite]"/>
                    )}
                </div>

                {online && stage >= 1 && (
                    <div
                        className="flex flex-col items-center gap-2 motion-safe:animate-[loader-fade_320ms_ease-out_both]">
                        <p className="text-xs text-muted-foreground">
                            {stage === 1 ? "Still waiting?" : "Taking longer than expected. Try one of these:"}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button size="sm" variant={stage === 1 ? "ghost" : "default"} onClick={reload}
                                    className="gap-2">
                                <RefreshCw className="h-3.5 w-3.5"/> Refresh
                            </Button>
                            {stage === 2 && (
                                <Button size="sm" variant="outline" onClick={newTab} className="gap-2">
                                    <ExternalLink className="h-3.5 w-3.5"/> Open in new tab
                                </Button>
                            )}
                        </div>
                        {stage === 2 && (
                            <p className="max-w-xs text-xs text-muted-foreground">
                                If this keeps happening, check your network and try again.
                            </p>
                        )}
                    </div>
                )}

                {!online && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <WifiOff className="h-3.5 w-3.5"/> Waiting for connection…
                    </div>
                )}
            </div>

            <style>{`
                @keyframes loader-shimmer { 0%{transform:translateX(-120%)} 100%{transform:translateX(420%)} }
                @keyframes loader-fade { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
            `}</style>
        </div>
    );
};

export default Index;
