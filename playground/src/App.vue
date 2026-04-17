<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">cetera-vue-utils playground</h1>

    <DemoNotify />
    <DemoSpinner />
    <DemoButton />
    <DemoDialog />
    <DemoInput />
    <DemoFormControls />
    <DemoDateInputs />
    <DemoDataTable />
  </div>

  <Notifications />
</template>

<script setup lang="ts">
import { Notifications } from 'cetera-vue-utils'
import DemoNotify from './demos/DemoNotify.vue'
import DemoSpinner from './demos/DemoSpinner.vue'
import DemoButton from './demos/DemoButton.vue'
import DemoDialog from './demos/DemoDialog.vue'
import DemoInput from './demos/DemoInput.vue'
import DemoFormControls from './demos/DemoFormControls.vue'
import DemoDateInputs from './demos/DemoDateInputs.vue'
import DemoDataTable from './demos/DemoDataTable.vue'
</script>
