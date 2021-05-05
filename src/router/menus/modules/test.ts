import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const test: MenuModule = {
  orderNo: 1100, //排序位置
  menu: {
    path: '/test/index',
    name: t('routes.dashboard.test'),
  },
};
export default test;
