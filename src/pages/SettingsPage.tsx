import { useThemeStore } from "@/store/useThemeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon, Palette, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ACCENTS = [
  { name: "Spotify", value: "#1db954" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Red", value: "#ef4444" },
];

export default function SettingsPage() {
  const { theme, toggleTheme, setAccent, accent } = useThemeStore();
  const [userName, setUserName] = useState("Aura User");
  const [editName, setEditName] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in-safe">
      <h1 className="text-2xl font-bold">Настройки</h1>

      {/* Profile */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Профиль</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {editName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => setEditName(false)}
                    onKeyDown={(e) => e.key === "Enter" && setEditName(false)}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 ring-primary"
                  />
                </div>
              ) : (
                <button onClick={() => setEditName(true)} className="text-left">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">Нажмите, чтобы изменить имя</p>
                </button>
              )}
            </div>
          </div>
          <Button variant="destructive" className="w-full gap-2 rounded-full" onClick={() => alert("Выход из аккаунта")}>
            <LogOut className="h-4 w-4" />
            Выйти из аккаунта
          </Button>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Тема оформления</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium">{theme === "dark" ? "Тёмная тема" : "Светлая тема"}</p>
                <p className="text-xs text-muted-foreground">Переключить оформление интерфейса</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme} className="rounded-full">
              Переключить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accent */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Акцентный цвет</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {ACCENTS.map((c) => (
              <button
                key={c.value}
                onClick={() => setAccent(c.value)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform hover:scale-110",
                  accent === c.value ? "border-foreground" : "border-transparent"
                )}
                style={{ backgroundColor: c.value }}
                title={c.name}
              >
                {accent === c.value && <Palette className="h-4 w-4 text-white drop-shadow" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
