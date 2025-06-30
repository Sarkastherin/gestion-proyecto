#!/bin/bash

if [ -z "$1" ]; then
  echo "⚠️  Debés ingresar un mensaje de commit como argumento."
  echo "Uso: npm run deploy -- 'Tu mensaje de commit'"
  exit 1
fi

git add .
git commit -m "$1"
git push origin dev
git checkout main
git merge dev
git push origin main
git checkout dev

echo "🚀 ¡Deploy completado desde dev hacia main!"
