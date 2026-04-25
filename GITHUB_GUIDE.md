# Инструкция: скачать проект и залить на GitHub

## Шаг 1 — Скачайте файлы проекта

Все исходники находятся в папке `/workspace/`. Скачайте эти файлы себе на компьютер.

**Важно:** папку `node_modules` копировать не нужно — зависимости установите локально.

---

## Шаг 2 — Установите зависимости локально

Откройте терминал в папке проекта и выполните:

```bash
cd aura-player
npm install
```

---

## Шаг 3 — Проверьте, что проект запускается

```bash
npm run dev
```

Откройте в браузере `http://localhost:5173`.

---

## Шаг 4 — Создайте репозиторий на GitHub

1. Зайдите на [github.com](https://github.com) и авторизуйтесь.
2. Нажмите зелёную кнопку **New**.
3. Введите имя репозитория: `aura-player`
4. Оставьте **Public** (или выберите **Private**).
5. **Не ставьте галочку** «Initialize this repository with a README».
6. Нажмите **Create repository**.
7. Скопируйте URL репозитория, например:
   ```
   https://github.com/ВАШ_НИК/aura-player.git
   ```

---

## Шаг 5 — Залейте код на GitHub

В терминале, находясь в папке проекта, выполните по очереди:

```bash
# 1. Инициализируем Git
git init

# 2. Добавляем все файлы
git add .

# 3. Создаём первый коммит
git commit -m "Initial commit: Aura Player MVP"

# 4. Переименовываем ветку в main
git branch -M main

# 5. Подключаем удалённый репозиторий
git remote add origin https://github.com/ВАШ_НИК/aura-player.git

# 6. Отправляем код на GitHub
git push -u origin main
```

> Если Git запросит пароль — используйте **Personal Access Token** с [github.com/settings/tokens](https://github.com/settings/tokens)

---

## Шаг 6 — Добавьте .gitignore

Создайте файл `.gitignore` в корне проекта:

```
node_modules
dist
*.local
.vscode
.idea
.DS_Store
```

```bash
git add .gitignore
git commit -m "Add .gitignore"
git push
```

---

## Шаг 7 — GitHub Pages (опционально)

В `vite.config.ts` добавьте:

```ts
export default defineConfig({
  base: '/aura-player/',
  // ...
})
```

В репозитории: **Settings → Pages → GitHub Actions**.

Приложение будет доступно по:
```
https://ВАШ_НИК.github.io/aura-player/
```
