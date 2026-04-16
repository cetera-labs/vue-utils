# cetera-vue-utils

Vue 3 components, composables and utilities.

## Installation

```bash
npm install cetera-vue-utils
```

## Composables

### useNotify

Global notification system with auto-dismiss.

```ts
import { useNotify } from 'cetera-vue-utils'

const notify = useNotify()

notify.success('Saved!')
notify.error('Something went wrong')
notify.warn('Check your input')
notify.info('New update available')

// Custom lifetime (ms)
notify.add('info', 'Custom message', 5000)
```

| Method | Type | Lifetime |
|---|---|---|
| `success(message)` | `success` | 3000ms |
| `info(message)` | `info` | 3000ms |
| `warn(message)` | `warn` | 4000ms |
| `error(message)` | `error` | 5000ms |
| `add(type, message, life)` | any | custom |

The `notifications` ref is shared across all calls to `useNotify()` — you can read it anywhere.

## Components

### Notifications

Renders active notifications. Place it once in the root layout.

Styled with Tailwind CSS classes — requires Tailwind to be configured in your project.

```vue
<script setup>
import { Notifications, useNotify } from 'cetera-vue-utils'

const notify = useNotify()
</script>

<template>
  <Notifications />
  <button @click="notify.success('Done!')">Save</button>
</template>
```

Notifications appear in the bottom-right corner with enter/leave transitions.

## TypeScript

All exports are fully typed. The `Notification` interface is available:

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

## License

MIT
