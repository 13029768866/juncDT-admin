<template>
  <div flex="~" align="items-center" justify="center" h="screen" class="login-wrapper">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      w="400px"
      p="25px"
      bg="white"
      border="rounded-6px"
    >
    </el-form>
  </div>
</template>

<script setup>
  const loginFormRef = ref();
  const loginForm = reactive({
    username: 'admin',
    password: '123456',
  });
  const loginRules = reactive({
    username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  });
</script>

<style lang="scss" scoped>
  .login-wrapper {
    background-image: url('/@/assets/images/login-background.jpg');
    background-size: cover;
  }
</style>
