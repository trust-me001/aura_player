import { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function BottomPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffle,
    isRepeat,
    togglePlay,
    playNext,
    playPrev,
    setCurrentTime,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const store = usePlayerStore.getState();
        if (store.currentTime >= store.duration) {
          store.playNext();
        } else {
          store.setCurrentTime(store.currentTime + 1);
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  if (!currentTrack) {
    return (
      <div className="flex h-20 items-center justify-center border-t border-border bg-card px-6 text-sm text-muted-foreground">
        Выберите трек для воспроизведения
      </div>
    );
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-20 items-center gap-4 border-t border-border bg-card px-6">
      {/* Track info */}
      <div className="flex w-60 items-center gap-3">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="h-12 w-12 rounded-md border border-border object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{currentTrack.title}</p>
          <p className="truncate text-xs text-muted-foreground">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Controls center */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={cn(
              "rounded-full p-1.5 transition-colors",
              isShuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <button
            onClick={playPrev}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
          </button>
          <button
            onClick={playNext}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            onClick={toggleRepeat}
            className={cn(
              "rounded-full p-1.5 transition-colors",
              isRepeat ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Repeat className="h-4 w-4" />
          </button>
        </div>
        <div className="flex w-full max-w-md items-center gap-2">
          <span className="w-9 text-right text-[10px] tabular-nums text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 1}
            step={1}
            onValueChange={(v) => setCurrentTime(v[0])}
            className="flex-1"
          />
          <span className="w-9 text-[10px] tabular-nums text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex w-40 items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={[Math.round(volume * 100)]}
          max={100}
          step={1}
          onValueChange={(v) => setVolume(v[0] / 100)}
          className="flex-1"
        />
      </div>
    </div>
  );
}
