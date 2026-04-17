# cetera-vue-utils

Компоненты, composables и утилиты для Vue 3.

## Содержание

**Компоненты**
- [Notifications](#notifications)
- [Spinner](#spinner)
- [InlineLoading](#inlineloading)
- [Button](#button)
- [ButtonLink](#buttonlink)
- [Dialog](#dialog)
- [ConfirmAction](#confirmaction)
- [Input](#input)
- [Checkbox](#checkbox)
- [Radiobutton](#radiobutton)
- [Toggle](#toggle)
- [Select](#select)
- [MultiSelect](#multiselect)
- [Slider](#slider)
- [Textarea](#textarea)
- [InputDate](#inputdate)
- [InputTime](#inputtime)
- [InputNumber](#inputnumber)
- [InputSearch](#inputsearch)
- [DataTable](#datatable)
- [Pagination](#pagination)
- [Popover](#popover)

**Composables**
- [useNotify](#usenotify)
- [useHttpClient](#usehttpclient)
- [useErrors](#useerrors)
- [useDataLoad](#usedataload)
- [useFormElements](#useformelements)

## Установка

```bash
npm install cetera-vue-utils
```

Пакет требует наличия peer dependency:

```bash
npm install vue
```

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

### InlineLoading

Инлайн-индикатор загрузки с опциональным текстом.

```vue
<template>
  <InlineLoading :isLoading="loading" loadingText="Сохранение..." />
</template>

<script setup>
import { InlineLoading } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `isLoading` | `boolean` | `true` | Показывать индикатор |
| `loadingText` | `string` | `'Загрузка ...'` | Текст рядом с иконкой |

### Button

Кнопка с поддержкой вариантов стиля, размеров и состояния загрузки.

```vue
<template>
  <Button label="Сохранить" @click="save" />
  <Button label="Загрузка" :loading="true" />
  <Button label="Secondary" severity="secondary" />
  <Button label="Удалить" severity="danger" :icon="TrashIcon" />
  <Button label="Outlined" outlined />
  <Button label="Маленькая" size="sm" />
  <Button label="Большая" size="lg" />
</template>

<script setup>
import { Button } from 'cetera-vue-utils'
import { TrashIcon } from '@heroicons/vue/24/outline'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `label` | `string` | — | Текст кнопки |
| `severity` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Вариант цвета |
| `outlined` | `boolean` | `false` | Контурный стиль (прозрачный фон) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер кнопки |
| `loading` | `boolean` | `false` | Спиннер + блокировка |
| `icon` | `FunctionalComponent` | — | Иконка (не отображается при `loading`) |

Все остальные attrs (например `type`, `disabled`) передаются в `<button>`.

### ButtonLink

Кнопка в виде ссылки (`<a>`) с теми же вариантами стиля.

```vue
<template>
  <ButtonLink href="/dashboard">На главную</ButtonLink>
  <ButtonLink href="https://example.com" target="_blank" severity="secondary">Внешняя ссылка</ButtonLink>
  <ButtonLink href="/docs" outlined size="sm">Документация</ButtonLink>
</template>

<script setup>
import { ButtonLink } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `label` | `string` | — | Текст (альтернатива слоту) |
| `severity` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Вариант цвета |
| `outlined` | `boolean` | `false` | Контурный стиль |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер |
| `icon` | `FunctionalComponent` | — | Иконка |

Все attrs (href, target, rel и др.) передаются в `<a>`.

### Dialog

Модальный диалог на основе `@headlessui/vue` с анимацией и backdrop.

```vue
<template>
  <Button label="Открыть" @click="visible = true" />
  <Dialog v-model:visible="visible" header="Заголовок">
    <p>Содержимое диалога</p>
    <template #footer>
      <Button label="Отмена" severity="secondary" @click="visible = false" />
      <Button label="Сохранить" @click="save" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, Button } from 'cetera-vue-utils'

const visible = ref(false)
</script>
```

Кастомный заголовок через слот:

```vue
<Dialog v-model:visible="visible">
  <template #header>
    <h2 class="text-xl font-bold text-red-600">Внимание!</h2>
  </template>
  Содержимое
</Dialog>
```

| Prop | Тип | Описание |
|---|---|---|
| `visible` (v-model) | `boolean` | Видимость диалога |
| `header` | `string` | Заголовок (альтернатива слоту `#header`) |

| Слот | Описание |
|---|---|
| `default` | Содержимое диалога |
| `header` | Кастомный заголовок (заменяет prop `header`) |
| `footer` | Кнопки действий (выравнивание по правому краю) |

Attrs (например `class`) передаются в `DialogPanel` — можно переопределить ширину:

```vue
<Dialog v-model:visible="visible" header="Широкий" class="max-w-3xl">...</Dialog>
```

### ConfirmAction

Диалог подтверждения действия. Управляется через `ref` и метод `confirm(id)`.

```vue
<template>
  <Button label="Удалить" severity="danger" @click="confirmRef?.confirm(item.id)" />
  <ConfirmAction ref="confirmRef" danger @confirm="onDelete">
    Вы уверены, что хотите удалить запись?
  </ConfirmAction>
</template>

<script setup>
import { ref } from 'vue'
import { ConfirmAction, Button } from 'cetera-vue-utils'

const confirmRef = ref()
const onDelete = (id) => {
  // удалить запись с id
}
</script>
```

| Prop | Тип | Описание |
|---|---|---|
| `danger` | `boolean` | Кнопка "Да" в красном цвете |

| Event | Payload | Описание |
|---|---|---|
| `confirm` | `id: any` | Срабатывает после подтверждения |

| Метод | Описание |
|---|---|
| `confirm(id)` | Открывает диалог, сохраняет `id` для передачи в событие |

### Input

Обёртка над полем ввода с поддержкой label, ошибок валидации и вспомогательного текста. Использует PrimeVue компоненты.

```vue
<template>
  <Input label="Email" v-model="email" :invalidMessage="errors.get('email')" />

  <!-- С кастомным компонентом -->
  <Input label="Дата" :component="DatePicker" v-model="date" />

  <!-- С helper текстом -->
  <Input label="Пароль" v-model="password" helperText="Минимум 8 символов" />
</template>

<script setup>
import { Input } from 'cetera-vue-utils'
import { DatePicker } from 'primevue'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `label` | `string` | — | Подпись поля |
| `component` | `Component` | `InputText` | PrimeVue компонент |
| `invalidMessage` | `string` | — | Текст ошибки |
| `helperText` | `string` | — | Вспомогательный текст |
| `id` | `string` | auto uuid | ID для связи label и input |

### Checkbox

Чекбокс с label. Поддерживает indeterminate состояние.

```vue
<template>
  <Checkbox v-model="checked" label="Согласен с условиями" />
  <Checkbox v-model="value" label="Опция" :value="'option1'" name="group" />
  <Checkbox v-model="checked" label="Частично" :indeterminate="true" />
</template>

<script setup>
import { Checkbox } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | Описание |
|---|---|---|
| `label` | `string` | Текст рядом с чекбоксом |
| `value` | `boolean \| string \| number` | Значение в группе |
| `name` | `string` | Имя группы |
| `disabled` | `boolean` | Заблокировать |
| `indeterminate` | `boolean` | Промежуточное состояние |

### Radiobutton

Радиокнопка с label.

```vue
<template>
  <Radiobutton v-model="selected" label="Вариант 1" value="a" name="group" />
  <Radiobutton v-model="selected" label="Вариант 2" value="b" name="group" />
</template>

<script setup>
import { Radiobutton } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | Описание |
|---|---|---|
| `label` | `string` | Текст рядом с кнопкой |
| `value` | `string \| number` | Значение этой кнопки |
| `name` | `string` | Имя группы |
| `disabled` | `boolean` | Заблокировать |

### Toggle

Переключатель (toggle switch) с label.

```vue
<template>
  <Toggle v-model="enabled" label="Включить уведомления" />
  <Toggle v-model="enabled" label="Активно" labelPosition="right" />
</template>

<script setup>
import { Toggle } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `label` | `string` | — | Текст |
| `labelPosition` | `'top' \| 'right'` | `'top'` | Позиция label |
| `disabled` | `boolean` | — | Заблокировать |

### Select

Выпадающий список. Обёртка над `Input` с PrimeVue `Select`.

```vue
<template>
  <Select v-model="selected" label="Статус" :options="statuses" />
</template>

<script setup>
import { Select } from 'cetera-vue-utils'

const statuses = [
  { name: 'Активный', value: 'active' },
  { name: 'Архив', value: 'archived' },
]
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `optionLabel` | `string` | `'name'` | Поле для отображения |
| `optionValue` | `string` | `'value'` | Поле для значения |

Все props `Input` (label, invalidMessage, helperText) и attrs PrimeVue `Select` передаются дальше.

### MultiSelect

Множественный выбор. Обёртка над `Input` с PrimeVue `MultiSelect`.

```vue
<template>
  <MultiSelect v-model="selected" label="Теги" :options="tags" selectedFirst />
</template>

<script setup>
import { MultiSelect } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `options` | `any[]` | — | Список вариантов |
| `optionLabel` | `string` | `'name'` | Поле для отображения |
| `optionValue` | `string` | `'value'` | Поле для значения |
| `selectedFirst` | `boolean` | — | Выбранные показываются первыми |

### Slider

Слайдер. Обёртка над `Input` с PrimeVue `Slider`.

```vue
<template>
  <Slider v-model="value" label="Громкость" :min="0" :max="100" />
  <Slider v-model="range" label="Диапазон" range />
</template>

<script setup>
import { Slider } from 'cetera-vue-utils'
</script>
```

Все props `Input` и attrs PrimeVue `Slider` передаются дальше.

### Textarea

Многострочное поле ввода. Обёртка над `Input` с PrimeVue `Textarea`.

```vue
<template>
  <Textarea v-model="text" label="Комментарий" rows="4" autoResize />
</template>

<script setup>
import { Textarea } from 'cetera-vue-utils'
</script>
```

Все props `Input` и attrs PrimeVue `Textarea` передаются дальше.

### InputDate

Поле выбора даты. Хранит значение в формате `yyyy-MM-dd` (строка).

```vue
<template>
  <InputDate v-model="date" label="Дата рождения" />
</template>

<script setup>
import { InputDate } from 'cetera-vue-utils'

const date = ref<string | null>(null) // '2024-01-15'
</script>
```

Требует `date-fns` (входит в зависимости пакета).

### InputTime

Поле выбора времени. Хранит значение в формате `HH:mm` (строка).

```vue
<template>
  <InputTime v-model="time" label="Время начала" />
</template>

<script setup>
import { InputTime } from 'cetera-vue-utils'

const time = ref<string | null>(null) // '14:30'
</script>
```

### InputNumber

Числовое поле ввода. Обёртка над `Input` с PrimeVue `InputNumber`.

```vue
<template>
  <InputNumber v-model="amount" label="Сумма" :minFractionDigits="2" mode="currency" currency="RUB" />
</template>

<script setup>
import { InputNumber } from 'cetera-vue-utils'
</script>
```

Все props `Input` и attrs PrimeVue `InputNumber` передаются дальше.

### InputSearch

Поле поиска с иконкой, кнопкой очистки и debounce. Требует `@heroicons/vue` и `@vueuse/core`.

```vue
<template>
  <InputSearch v-model="query" :debounce="500" :loading="isSearching" placeholder="Поиск..." />
</template>

<script setup>
import { InputSearch } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `modelValue` | `string` | `''` | Значение поиска |
| `debounce` | `number` | `800` | Задержка перед emit (мс) |
| `loading` | `boolean` | `false` | Показывает спиннер вместо крестика |

### Pagination

Компонент постраничной навигации с выбором количества строк.

```vue
<template>
  <Pagination
    :total-records="243"
    :limit="limit"
    :offset="offset"
    @refresh="onRefresh"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Pagination } from 'cetera-vue-utils'

const limit = ref(20)
const offset = ref(0)

const onRefresh = ({ limit: l, offset: o }) => {
  if (l !== undefined) limit.value = l
  if (o !== undefined) offset.value = o
}
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `totalRecords` | `number` | `0` | Общее количество записей |
| `limit` | `number` | — | Записей на странице |
| `offset` | `number` | — | Текущее смещение |
| `limitOptions` | `number[]` | `[20, 50, 100]` | Варианты для выбора количества строк |

Событие `@refresh` передаёт объект `{ limit, offset }` при смене страницы или количества строк.

### Popover

Всплывающая панель с позиционированием. Управление состоянием через `@headlessui/vue`.

```vue
<template>
  <Popover>
    <template #trigger>
      <Button label="Открыть" outlined />
    </template>
    <div class="p-3">
      <p>Содержимое поповера</p>
    </div>
  </Popover>
</template>

<script setup>
import { Popover, Button } from 'cetera-vue-utils'
</script>
```

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `placement` | `'bottom-start' \| 'bottom-end' \| 'bottom' \| 'top-start' \| 'top-end' \| 'top'` | `'bottom-start'` | Позиция панели |

| Слот | Описание |
|---|---|
| `#trigger` | Элемент-триггер |
| `default` | Содержимое панели |

Закрывается по `Escape`, клику вне панели — поведение headlessui.

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

### useFormElements

Вспомогательный composable для форм. Используется внутри компонента `Input`, но доступен отдельно.

```ts
import { useFormElements } from 'cetera-vue-utils'

const { isInvalid, isHelper, uuid } = useFormElements(props)
```

## TypeScript

Все экспорты полностью типизированы:

```ts
import type {
  Notification,
  HttpResponse,
  UseHttpOptions,
  ErrorsData,
  InputProps,
  SpinnerSize,
} from 'cetera-vue-utils'
```

## Лицензия

MIT
