<template>
  <div class="content">
    <card-list :listCardItems="listCardItems" @listClick="listClick" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import CardList from '../components/CardList.vue';
  import { listCardItems } from '../primary/data';
  // import router from '/@/router/index';

  export default defineComponent({
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
