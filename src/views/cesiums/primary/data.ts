export interface ListCardItem {
  href: string;
  avatar: string;
  title: string; //标题
  icon?: string; //图标
  description?: string; //描述
  content: string;
}
const listCardItem: Array<ListCardItem> = [];
for (let i = 0; i < 23; i++) {
  listCardItem.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

export const listCardItems: ListCardItem[] = listCardItem;
