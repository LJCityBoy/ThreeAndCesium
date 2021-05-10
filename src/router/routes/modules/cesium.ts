import type { AppRouteModule } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { PrimaryCesiums } from './primaryCesium';

const cesium: AppRouteModule = {
  path: '/cesium',
  name: 'Cesium',
  component: LAYOUT,
  redirect: '/cesium/primary',
  meta: {
    icon: 'ion:coffee',
    title: t('routes.dashboard.cesium'),
  },
  children: [
    {
      path: 'primary',
      name: 'Primary',
      // component: () => import('/@/views/cesiums/primary/index.vue'),
      component: getParentLayout('Primary'),
      redirect: '/cesium/primary',
      meta: {
        title: t('routes.dashboard.primary'),
      },
      children: [
        {
          path: '',
          name: 'PrimaryIndex',
          component: () => import('/@/views/cesiums/primary/index.vue'),
          meta: {
            title: t('routes.dashboard.primary'),
          },
        },
        ...PrimaryCesiums,
      ],
    },
    {
      path: 'intermediate',
      name: 'Intermediate',
      component: () => import('/@/views/cesiums/intermediate/index.vue'),
      meta: {
        title: t('routes.dashboard.intermediate'),
      },
    },
    {
      path: 'advanced',
      name: 'Advanced',
      component: () => import('/@/views/cesiums/advanced/index.vue'),
      meta: {
        title: t('routes.dashboard.advanced'),
      },
    },
  ],
};

export default cesium;
