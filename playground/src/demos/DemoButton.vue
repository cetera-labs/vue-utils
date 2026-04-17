<template>
  <section class="bg-white rounded-xl shadow p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Button / ButtonLink</h2>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <span class="text-xs text-gray-400 font-mono">severity</span>
        <div class="flex gap-3 flex-wrap items-center">
          <Button label="Primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Danger" severity="danger" />
          <Button label="Загрузка" :loading="true" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xs text-gray-400 font-mono">outlined</span>
        <div class="flex gap-3 flex-wrap items-center">
          <Button label="Primary" outlined />
          <Button label="Secondary" severity="secondary" outlined />
          <Button label="Danger" severity="danger" outlined />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xs text-gray-400 font-mono">size</span>
        <div class="flex gap-3 flex-wrap items-end">
          <Button label="Small" size="sm" />
          <Button label="Medium" />
          <Button label="Large" size="lg" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xs text-gray-400 font-mono">ButtonLink</span>
        <div class="flex gap-3 flex-wrap items-center">
          <ButtonLink href="https://github.com/cetera-labs/vue-utils" target="_blank">Primary</ButtonLink>
          <ButtonLink href="https://github.com/cetera-labs/vue-utils" target="_blank" severity="secondary">Secondary</ButtonLink>
          <ButtonLink href="https://github.com/cetera-labs/vue-utils" target="_blank" outlined>Outlined</ButtonLink>
          <ButtonLink href="https://github.com/cetera-labs/vue-utils" target="_blank" size="sm">Small</ButtonLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button, ButtonLink } from 'cetera-vue-utils'
</script>
