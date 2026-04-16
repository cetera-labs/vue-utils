# cetera-vue-utils

Компоненты, composables и утилиты для Vue 3.

## Установка

```bash
npm install cetera-vue-utils
```

## Composables

### useNotify

Глобальная система уведомлений с автоматическим скрытием.

```ts
import { useNotify } from 'cetera-vue-utils'

const notify = useNotify()

notify.success('Сохранено!')
notify.error('Что-то пошло не так')
notify.warn('Проверьте введённые данные')
notify.info('Доступно обновление')

// Произвольное время показа (мс)
notify.add('info', 'Произвольное сообщение', 5000)
```

| Метод | Тип | Время показа |
|---|---|---|
| `success(message)` | `success` | 3000мс |
| `info(message)` | `info` | 3000мс |
| `warn(message)` | `warn` | 4000мс |
| `error(message)` | `error` | 5000мс |
| `add(type, message, life)` | любой | произвольное |

Ref `notifications` общий для всех вызовов `useNotify()` — его можно читать в любом месте приложения.

## Компоненты

### Notifications

Отображает активные уведомления. Разместите один раз в корневом layout.

Стилизован через классы Tailwind CSS — требует подключённого Tailwind в проекте.

```vue
<script setup>
import { Notifications, useNotify } from 'cetera-vue-utils'

const notify = useNotify()
</script>

<template>
  <Notifications />
  <button @click="notify.success('Готово!')">Сохранить</button>
</template>
```

Уведомления появляются в правом нижнем углу с анимацией появления и исчезновения.

## TypeScript

Все экспорты полностью типизированы. Интерфейс `Notification` доступен для импорта:

```ts
import type { Notification } from 'cetera-vue-utils'
```

```ts
interface Notification {
  id: number
  type: 'success' | 'error' | 'warn' | 'info'
  message: string
}
```

## Лицензия

MIT
