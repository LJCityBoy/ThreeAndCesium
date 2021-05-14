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
    title: 'HELLO OpenGlobus',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    imgsrc: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    description:
      'OpenGlobus 是一个设计用于显示可交互性三维地图、影像瓦片、矢量数据、标注、三维对象的 JavaScript 库。它所用的技术是纯 WebGL，完全开源免费',
    routerTo: '/openglobus/index/hellOpenglobus',
  },
];

export const listCardItems: ListCardItem[] = listCardItem;
