# cetera-vue-utils

Компоненты, composables и утилиты для Vue 3.

## Установка

```bash
npm install cetera-vue-utils
```

Пакет требует наличия peer dependencies:

```bash
npm install vue axios
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

### useHttp

HTTP-клиент на основе axios с автоматическими уведомлениями об ошибках и поддержкой отмены запросов.

```ts
import { useHttp } from 'cetera-vue-utils'

const http = useHttp({
    baseURL: 'https://api.example.com',
    onUnauthorized: () => router.push('/login'),
})

// GET
const { data } = await http.get<User[]>('/users')

// POST
await http.post('/users', { data: { name: 'Иван' } })

// С параметрами
await http.get('/users', { params: { page: 1 } })

// Отмена предыдущего запроса при повторном вызове
await http.get('/search', { params: { q: 'текст' }, cancelPrevious: true })

// Скачать файл
await http.download('/reports/export.xlsx')
```

| Метод | Описание |
|---|---|
| `get<T>(url, config?)` | GET-запрос |
| `post<T>(url, config?)` | POST-запрос |
| `patch<T>(url, config?)` | PATCH-запрос |
| `put<T>(url, config?)` | PUT-запрос |
| `destroy<T>(url, config?)` | DELETE-запрос |
| `download(url, config?)` | Скачать файл |

**Автоматическое поведение:**
- `2xx` с полем `message` — показывает `notify.success`
- `400`, `5xx` — показывает `notify.error`
- `422` — показывает `notify.error` с текстом ошибки валидации
- `401` — вызывает `onUnauthorized()`
- `403` — показывает `notify.error("Действие недоступно!")`
- `419` — показывает `notify.error` о протухшей сессии

## TypeScript

Все экспорты полностью типизированы. Интерфейс `Notification` доступен для импорта:

```ts
import type { Notification, HttpResponse, UseHttpOptions } from 'cetera-vue-utils'
```

```ts
interface Notification {
  id: number
  type: 'success' | 'error' | 'warn' | 'info'
  message: string
}

interface HttpResponse<T> {
  message?: string
  status?: string
  errors?: Record<string, string | string[]>
  data?: T
  meta?: { total?: number }
  cancelled?: boolean
}

interface UseHttpOptions {
  baseURL: string
  onUnauthorized?: () => void
}
```

## Лицензия

MIT
