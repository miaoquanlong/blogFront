<template>
  <div>
    <a-card title="Card Title" style="width:50%;margin:55px auto">
      <a href="#" slot="extra">more</a>
      <a-form id="components-form-demo-normal-login" class="login-form">
        <a-form-item>
          <a-input v-decorator="['userName', { rules: [{ required: true, message: 'Please input your username!' }] }]" placeholder="Username" v-model="loginForm.username">
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-decorator="[ 'password', { rules: [{ required: true, message: 'Please input your Password!' }] }]" type="password" placeholder="Password" v-model="loginForm.password">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox v-decorator="[ 'remember', { valuePropName: 'checked',initialValue: true, }]"> Remember me</a-checkbox> -->
          <a class="login-form-forgot"> 忘记密码</a>
          <a-button type="primary" class="login-form-button" @click="handleLogin" :disabled="Boolean(this.$Cookies.get('name'))">登陆</a-button>
          <a-button type="primary" class="login-form-button" @click="registered" :disabled="Boolean(this.$Cookies.get('name'))">注册</a-button>Or <a href="">register now! </a>

        </a-form-item>
      </a-form>
    </a-card>

  </div>

</template>

<script>
import LoginBg from '@/assets/images/bg.jpg'
export default {
  components: {
  },
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的账号!'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能低于1位!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: ''
      },
      loginRules: {
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      passwordType: 'password',

      LoginBg: LoginBg
    }
  },

  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    //登陆
    handleLogin () {
      console.log(232323232);
      let para = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      this.logins(para).then(res => {
        Object.assign(para, res)
        this.$store.dispatch('LoginByUsername', para).then((res) => {
          this.$router.push({
            path: '/'
          })
        }).catch(() => {
        })
      }).catch((err) => {
        this.$message.error(err);
      })
    },
    logins (param) {
      return this.$request.post('/api/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
    },
    //注册
    registered () {
      this.$request.post('/api/userRegister', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        this.$message.success('注册成功');
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // handleSubmit (e) {
    //   return this.$request.post('/api/login', {
    //     username: this.loginForm.username,
    //     password: this.loginForm.password
    //   })
    // },
  },
  created () {
  }
}
</script>


<style type="text/scss" lang="scss" scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
