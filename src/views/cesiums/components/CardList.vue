<template>
  <div class="md:flex">
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="listCardItems"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component :is="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img
              width="120"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar><a-avatar :src="item.avatar" alt="111" /></template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
  import { List, Avatar } from 'ant-design-vue';
  import { listCardItems } from '../primary/data';
  export default defineComponent({
    components: {
      StarOutlined,
      LikeOutlined,
      MessageOutlined,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      [Avatar.name]: Avatar,
    },
    setup() {
      const pagination = {
        onChange: (page: number) => {
          console.log(page);
        },
        pageSize: 5,
      };
      const actions: Record<string, string>[] = [
        { type: 'StarOutlined', text: '156' },
        { type: 'LikeOutlined', text: '156' },
        { type: 'MessageOutlined', text: '2' },
      ];
      return {
        pagination,
        actions,
        listCardItems,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep(.ant-list) {
    width: 100%;
    padding: 5px 10px;
  }

  ::v-deep(.ant-list-item) {
    border-bottom: 1px solid #d68888 !important;
  }
</style>
