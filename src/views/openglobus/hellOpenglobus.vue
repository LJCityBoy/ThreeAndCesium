<template>
  <div id="ogView"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  export default defineComponent({
    name: 'OpenGlobus',
    setup() {
      let goController: any = '';
      onMounted(() => {
        goController = new og.Globe({
          target: 'ogView',
        });
      });

      return {
        goController,
      };
    },
  });
</script>
