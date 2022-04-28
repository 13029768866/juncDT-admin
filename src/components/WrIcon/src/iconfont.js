import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'fontIcon',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    const attrs = this.$attrs;

    // 字体图标处理方式
    return h('i', {
      class: `iconfont ${this.icon}`,
      ...attrs,
    });
  },
});
