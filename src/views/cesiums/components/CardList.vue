<template>
  <div class="md:flex">
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="listCardItems"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title" @click.prevent.stop="listClickAction(item)">
          <template #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component :is="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img width="120" :src="item.imgsrc" />
          </template>
          <router-link :to="item.routerTo">
            <a-list-item-meta :description="item.description">
              <template #title>
                <a>{{ item.title }}</a>
              </template>
              <template #avatar><a-avatar :src="item.avatar" /></template>
            </a-list-item-meta>
          </router-link>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
  import { List, Avatar } from 'ant-design-vue';
  export default defineComponent({
    name: 'CardList',
    components: {
      StarOutlined,
      LikeOutlined,
      MessageOutlined,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      [Avatar.name]: Avatar,
    },
    props: {
      listCardItems: {
        type: Array,
        required: true,
        default() {
          return [];
        },
      },
    },
    setup(props, context) {
      console.log(props);
      //点击列
      const listClickAction = (item) => {
        context.emit('listClick', { item });
      };
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
        listClickAction,
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
    border-bottom: 1px solid #0960bd !important;
  }
</style>
