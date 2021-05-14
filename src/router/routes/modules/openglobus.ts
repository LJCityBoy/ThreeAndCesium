import type { AppRouteModule } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { OpenglobusChilds } from './openglobuschilds';

const dashboard: AppRouteModule = {
  path: '/openglobus',
  name: 'OpenGlobus',
  component: LAYOUT,
  redirect: '/openglobus/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.openglobus'),
  },
  children: [
    {
      path: 'index',
      name: 'Index',
      // component: () => import('/@/views/cesiums/primary/index.vue'),
      component: getParentLayout('Index'),
      redirect: '/cesium/primary',
      meta: {
        title: t('routes.dashboard.openglobus'),
      },
      children: [
        {
          path: '',
          name: 'OpenGlobusIndex', //这个名字全局唯一
          component: () => import('/@/views/openglobus/index.vue'),
          meta: {
            title: t('routes.dashboard.openglobus'),
            icon: 'simple-icons:about-dot-me',
          },
        },
        ...OpenglobusChilds,
      ],
    },
  ],
};

export default dashboard;
