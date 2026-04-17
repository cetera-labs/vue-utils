# cetera-vue-utils

Компоненты, composables и утилиты для Vue 3.

## Установка

```bash
npm install cetera-vue-utils
```

Пакет требует наличия peer dependency:

```bash
npm install vue
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

### Spinner

Оверлей загрузки поверх контента. Требует `position: relative` на родительском элементе.

```vue
<template>
  <div class="relative">
    <Spinner :isLoading="loading" size="lg" />
    <p>Контент</p>
  </div>
</template>

<script setup>
import { Spinner } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `isLoading` | `boolean` | `true` | Показывать спиннер |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'xl'` | Размер иконки |

Стилизован через Tailwind CSS. Иконка берётся из `@primevue/icons`.

### useHttpClient

HTTP-клиент на основе axios с автоматическими уведомлениями об ошибках и поддержкой отмены запросов.

```ts
import { useHttpClient } from 'cetera-vue-utils'

const http = useHttpClient({
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

### useErrors

Управление ошибками валидации формы.

```ts
import { useErrors } from 'cetera-vue-utils'

const errors = useErrors()

// Записать ошибки из ответа сервера
errors.record(response.errors)

// Проверить наличие ошибки поля
errors.has('email')       // true / false

// Получить текст ошибки поля
errors.get('email')       // "Email обязателен"

// Есть ли хоть одна ошибка
errors.any()              // true / false

// Установить одну ошибку
errors.set({ path: 'email', value: 'Неверный формат' })

// Очистить одно поле или все
errors.clear('email')
errors.clear()
```

### useDataLoad

Загрузка данных через `useHttpClient` с управлением состоянием `loading` и `data`.

```ts
import { useDataLoad, useHttpClient } from 'cetera-vue-utils'

const http = useHttpClient({ baseURL: '/api' })

// Простой случай
const { data, loading, load } = useDataLoad<User[]>(() => http.get('/users'))

// С параметрами
const { data, meta, loading, load } = useDataLoad<User[], { page: number }>(
    (params) => http.get('/users', { params })
)

// Загрузить
await load({ page: 1 })

// Загрузить только если данных ещё нет (кэш)
await load(true)
await load({ page: 1 }, true)

// Разделить состояние между несколькими вызовами
const data = ref<User[]>()
const loading = ref(false)
const { load: loadUsers } = useDataLoad(() => http.get('/users'), { data, loading })
const { load: loadMore } = useDataLoad((p) => http.get('/users', { params: p }), { data, loading })
```

Возвращаемый `meta` содержит `total` — удобно для пагинации.

## TypeScript

Все экспорты полностью типизированы. Интерфейс `Notification` доступен для импорта:

```ts
import type { Notification, HttpResponse, UseHttpOptions, ErrorsData } from 'cetera-vue-utils'
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
