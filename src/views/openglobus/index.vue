<template>
  <div class="content">
    <card-list :listCardItems="listCardItems" @listClick="listClick" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import CardList from '/@/views/components/CardList.vue';
  import { listCardItems } from './data/data.ts';
  // import router from '/@/router/index';

  export default defineComponent({
    name: 'OpenGlobus',
    components: { CardList },
    setup() {
      const listClick = (item) => {
        console.log(item, '回调');
      };
      onMounted(() => {});

      return {
        listCardItems,
        listClick,
      };
    },
  });
</script>
