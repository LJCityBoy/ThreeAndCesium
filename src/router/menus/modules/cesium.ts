import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const cesium: MenuModule = {
  orderNo: 11,
  menu: {
    path: '/cesium',
    name: t('routes.dashboard.cesium'),
    children: [
      {
        path: 'primary', //初级
        name: t('routes.dashboard.primary'),
      },
      {
        path: 'intermediate', //中级
        name: t('routes.dashboard.intermediate'),
      },
      {
        path: 'advanced', //高级
        name: t('routes.dashboard.advanced'),
      },
    ],
  },
};

export default cesium;
