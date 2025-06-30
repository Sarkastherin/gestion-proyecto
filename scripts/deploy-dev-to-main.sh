#!/bin/bash

# Verificamos que haya un mensaje de commit
if [ -z "$1" ]; then
  echo "⚠️  Debés ingresar un mensaje de commit como argumento."
  echo "Uso: npm run deploy -- 'mensaje' [patch|minor|major]"
  exit 1
fi

# Segundo argumento opcional: tipo de versión
VERSION_TYPE=${2:-patch} # default a 'patch' si no se pasa nada

# Comenzamos con los cambios
git add .
git commit -m "$1"

# Bump de versión
npm version $VERSION_TYPE --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore(release): version $VERSION_TYPE"

# Push y merge
git push origin dev
git checkout main
git merge dev
git push origin main
git checkout dev

echo "✅ Versión '$VERSION_TYPE' actualizada y deploy completado desde 'dev' hacia 'main'"
