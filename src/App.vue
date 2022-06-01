<template>
  <el-config-provider :locale="eleLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
  import { ElConfigProvider } from 'element-plus';
  import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import En from 'element-plus/lib/locale/lang/en';

  const eleLocale = computed(() => {
    return locale.value === 'zh' ? zhCn : En;
  });
</script>

<style scoped></style>
