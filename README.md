# 🏍️ Moto Portal (Vue 3 + FSD)

Учебно-демонстрационный проект для live-coding собеседования.  
Сделан в стиле **мото-тематики**: есть **гараж**, **сборка мотоцикла**, **список задач** и **список присутствующих**.  
В финале доступен вау-эффект с именами участников 🚀

---

## 🚀 Стек
- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [VueUse](https://vueuse.org/) — удобные композиционные хуки
- [FSD](https://feature-sliced.design/ru/docs/get-started/overview) — методология организации кода
- LocalStorage через `useStorage` (VueUse)

---

## 📂 Структура проекта
```
/src
    app/      # инициализация приложения, App.vue, роутер, pinia
    entities/ # доменные сущности (attendee, task)
    features/ # прикладные сценарии (добавление участника/задачи и т.п.)
    widgets/  # самостоятельные блоки UI (панели, сборка мотоцикла, финал)
    pages/    # страницы (home, challenge)
    shared/   # утилиты, общие компоненты
```

---

## 🏗️ Установка и запуск

```bash
# Установить зависимости
pnpm install

# Запустить в dev-режиме
pnpm dev

# Сборка на прод
pnpm build

# Превью собранной версии
pnpm preview
