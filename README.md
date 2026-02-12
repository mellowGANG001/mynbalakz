# MYNBALA - Детский развлекательный парк

Премиальный веб-сайт для сети детских развлекательных парков MYNBALA в Казахстане.

## Технологии

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - Строгая типизация
- **Tailwind CSS** - Utility-first стилизация
- **Framer Motion** - Плавные анимации
- **shadcn/ui** - UI компоненты
- **Supabase** - База данных и API

## Особенности дизайна

- Эмоциональный UI с яркими градиентами
- 3D эффекты и spring анимации
- Mobile-First подход (оптимизация для WebView)
- Крупные border-radius (40px+) для мягкого интерфейса
- Плавные переходы на каждое действие пользователя

## Запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен сервера
npm start
```

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Главная страница
│   └── globals.css     # Глобальные стили
├── components/
│   ├── ui/             # shadcn компоненты
│   └── sections/       # Секции страниц
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── QuickActions.tsx
│       ├── Branches.tsx
│       ├── Promos.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase.ts     # Supabase клиент
│   └── utils.ts        # Утилиты
└── types/
    └── database.ts     # TypeScript типы
```

## Цветовая палитра

- **Primary** - #FF6B35 (Оранжевый)
- **Secondary** - #7B2CBF (Фиолетовый)
- **Accent** - #00D9FF (Бирюзовый)

## Филиалы

- Тараз
- Шымкент
- Аксу
- Атырау

---

Сделано с любовью для MYNBALA
