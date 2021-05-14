import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const openglobus: MenuModule = {
  orderNo: 12,
  menu: {
    path: '/openglobus/index',
    name: t('routes.dashboard.openglobus'),
  },
};
export default openglobus;
