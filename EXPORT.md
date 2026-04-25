# Как скачать проект Aura Player

## Быстрый способ (если есть кнопка в интерфейсе)

В правом верхнем углу интерфейса CodePal должна быть кнопка **"Download"** или **"Export"** — нажмите её, чтобы скачать весь проект одним ZIP-архивом.

## Ручной способ — скопируйте эти файлы

Если кнопки нет, скопируйте содержимое каждого файла из папки `/workspace/`:

### Корневые файлы (обязательны)
- `index.html`
- `package.json`
- `vite.config.js`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `components.json`
- `.eslintrc.cjs`
- `.gitignore`

### Папка `src/`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/vite.env.d.ts`

### Папка `src/lib/`
- `src/lib/utils.ts`
- `src/lib/types.ts`

### Папка `src/store/`
- `src/store/usePlayerStore.ts`
- `src/store/useThemeStore.ts`

### Папка `src/components/`
- `src/components/Layout.tsx`
- `src/components/Sidebar.tsx`
- `src/components/BottomPlayer.tsx`
- `src/components/TrackRow.tsx`
- `src/components/TrackMenu.tsx`
- `src/components/PlaylistCard.tsx`
- `src/components/PlaylistMenu.tsx`

### Папка `src/pages/`
- `src/pages/Library.tsx`
- `src/pages/ArtistPage.tsx`
- `src/pages/PlaylistsPage.tsx`
- `src/pages/PlaylistDetail.tsx`
- `src/pages/SettingsPage.tsx`
- `src/pages/NotFound.tsx`

### Папка `public/`
- `public/favicon.svg`
- `public/robots.txt`

---

## Что НЕ нужно копировать

- `node_modules/` — установите через `npm install`
- `dist/` — создастся при сборке
- `package-lock.json` — создастся при `npm install`

---

## После скачивания

```bash
# 1. Создайте папку проекта
mkdir aura-player
cd aura-player

# 2. Создайте все файлы выше (вставьте содержимое из интерфейса)

# 3. Установите зависимости
npm install

# 4. Запустите
npm run dev
```
