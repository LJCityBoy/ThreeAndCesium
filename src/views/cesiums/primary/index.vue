<template>
  <div class="content">
    <card-list />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import CardList from '../components/CardList.vue';

  export default defineComponent({
    components: { CardList },
    setup() {
      onMounted(() => {});

      return {};
    },
  });
</script>
