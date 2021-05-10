/**
 * 初级路由设置
 * 详情页路由
 */
import { t } from '/@/hooks/web/useI18n';

export const PrimaryCesiums = [
  {
    path: 'showCesium',
    name: 'ShowCesium',
    component: () => import('/@/views/cesiums/primary/showCesium.vue'),
    meta: {
      currentActiveMenu: '/cesium/primary',
      title: t('routes.dashboard.showCesium'),
      hideTab: true,
    },
  },
  {
    path: 'entityDraw',
    name: 'EntityDraw',
    component: () => import('/@/views/cesiums/primary/entityDraw.vue'),
    meta: {
      currentActiveMenu: '/cesium/primary',
      title: t('routes.dashboard.entityDraw'),
      hideTab: true,
    },
  },
];
