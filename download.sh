#!/bin/bash
# Скрипт для создания ZIP-архива проекта Aura Player

cd /workspace

echo "📦 Создаю архив проекта..."

zip -r aura-player.zip . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "dist/*" \
  -x "*.zip"

echo "✅ Архив создан: /workspace/aura-player.zip"
echo "📥 Скачайте файл aura-player.zip и распакуйте на компьютере"
