/**
 * 详情页路由
 */
import { t } from '/@/hooks/web/useI18n';

export const OpenglobusChilds = [
  {
    path: 'hellOpenglobus',
    name: 'HellOpenglobus',
    component: () => import('/@/views/openglobus/hellOpenglobus.vue'),
    meta: {
      currentActiveMenu: '/openglobus/index',
      title: t('routes.dashboard.hellOpenglobus'),
      hideTab: true,
    },
  },
];
