import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.test'),
  },
  children: [
    {
      path: 'index',
      name: 'TestPage',
      component: () => import('/@/views/sys/test/index.vue'),
      meta: {
        title: t('routes.dashboard.test'),
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
