<template>
    <PrimeButton v-slot="slotProps" as-child>
        <a v-bind="$attrs" :class="slotProps.class">
            <slot />
        </a>
    </PrimeButton>
</template>
<script setup lang="ts">
import PrimeButton from "primevue/button"
</script>
