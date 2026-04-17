<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">cetera-vue-utils playground</h1>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div>
        <DemoNotify />
        <DemoButton />
        <DemoDialog />
        <DemoInput />
      </div>
      <div>
        <DemoSpinner />
        <DemoFormControls />
        <DemoDateInputs />
        <DemoPopover />
        <DemoPagination />
        <DemoDataTable />
      </div>
    </div>
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
import DemoPopover from './demos/DemoPopover.vue'
import DemoPagination from './demos/DemoPagination.vue'
</script>
