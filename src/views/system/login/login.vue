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
      <h3 text="center" class="title">JuncDT管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <template #prefix>
            <IconifyIconOffline icon="avatar" width="18" height="18" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.stop="handleLogin"
        >
          <template #prefix>
            <IconifyIconOffline icon="lock" width="18" height="18" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="default"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin(loginFormRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import md5 from 'js-md5';
  import Cookies from 'js-cookie';
  import { useUserStoreHook } from '/@/store/modules/user';

  const route = useRoute();
  const router = useRouter();
  const redirect = ref();
  const loading = ref(false);
  const loginFormRef = ref();
  const loginForm = reactive({
    username: 'admin',
    password: '123456',
  });
  const loginRules = reactive({
    username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  });

  const getCookie = () => {
    const username = Cookies.get('username');
    const password = Cookies.get('password');

    loginForm.username = username === undefined ? loginForm.username : username;
    loginForm.password = password === undefined ? loginForm.password : password;
  };

  const handleLogin = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        loading.value = true;
        let data = {
          username: loginForm.username,
          password: md5(loginForm.username + loginForm.password),
        };
        useUserStoreHook()
          .Login(data)
          .then(() => {
            router.push({
              path: redirect.value || '/',
            });
          })
          .catch(() => {
            loading.value = false;
          });
        /* 记住密码 todo */
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  watch(
    () => route,
    () => {
      redirect.value = route.query && route.query.redirect;
    }
  );
  onMounted(() => {
    getCookie();
  });
</script>

<style lang="scss" scoped>
  .login-wrapper {
    background-image: url('/@/assets/images/login-background.jpg');
    background-size: cover;

    .title {
      margin: 0px auto 30px auto;
      color: #707070;
    }

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
</style>
