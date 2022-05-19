import { h, defineComponent } from 'vue';
import { Icon as IconifyIcon, addIcon } from '@iconify/vue/dist/offline';

// element-plus icon
import Check from '@iconify-icons/ep/check';
import Setting from '@iconify-icons/ep/setting';
import Menu from '@iconify-icons/ep/menu';
import Close from '@iconify-icons/ep/close';
import RefreshRight from '@iconify-icons/ep/refresh-right';
import ArrowDown from '@iconify-icons/ep/arrow-down';
import CloseBold from '@iconify-icons/ep/close-bold';

addIcon('check', Check);
addIcon('setting', Setting);
addIcon('menu', Menu);
addIcon('close', Close);
addIcon('refresh-right', RefreshRight);
addIcon('arrow-down', ArrowDown);
addIcon('close-bold', CloseBold);

// remix icon
import arrowRightSLine from '@iconify-icons/ri/arrow-right-s-line';
import arrowLeftSLine from '@iconify-icons/ri/arrow-left-s-line';

addIcon('arrow-right-s-line', arrowRightSLine);
addIcon('arrow-left-s-line', arrowLeftSLine);

// Iconify Icon在Vue里离线使用
export default defineComponent({
  name: 'IconifyIcon',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        ...attrs,
      },
      {
        default: () => [],
      }
    );
  },
});
