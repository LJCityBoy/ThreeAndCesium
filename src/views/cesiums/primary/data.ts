export interface ListCardItem {
  href: string;
  avatar: string;
  title: string; //标题
  icon?: string; //图标
  description?: string; //描述
  routerTo: string;
  imgsrc?: string;
}
const listCardItem: Array<ListCardItem> = [
  {
    href: '',
    title: 'HELLO Cesium',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    imgsrc: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    description: '在vue3中展示Cesium的地球，并隐藏相关官方按钮简单示例,效果请看详情。',
    routerTo: '/cesium/primary/showCesium',
  },
  {
    href: '',
    title: '绘制各种形状',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    imgsrc: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    description: '一些绘制简单形状的方法，Entity、CZML方式添加简单形状的方法。',
    routerTo: '/cesium/primary/entityDraw',
  },
];

export const listCardItems: ListCardItem[] = listCardItem;
