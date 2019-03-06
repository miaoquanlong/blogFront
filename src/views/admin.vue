<template>
  <div>
    <el-row>
      <el-card :body-style="{ padding: '0px',}" class="comment ">
        <div>
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" class="login" :disabled="Boolean(this.$Cookies.get('name'))">
            <div>
              <h3 class="title">Blog login Page</h3>
            </div>
            <el-form-item prop="username">
              <el-input class="inputstayle" name="username" clearable type="text" v-model="loginForm.username" placeholder="请输入正确的用户名!" />
            </el-form-item>
            <el-form-item prop="password">
              <span>
              </span>
              <el-input class="inputstayle" name="password" clearable :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码!" />
              <span @click="showPwd">
              </span>
            </el-form-item>
            <el-button size="small" type="primary" @click.native.prevent="handleLogin">登录
            </el-button>
            <el-button size="small" type="primary" @click.native.prevent="registered">注册
            </el-button>
          </el-form>
        </div>
      </el-card>
    </el-row>
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
      this.$refs.loginForm.validate(valid => {
        if (valid) {
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
            this.$message({
              message: err,
              type: 'warning'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
        this.$message({
          message: '注册成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: '注册失败',
          type: 'info'
        })
      })
    }
  },
  created () {
  }
}
</script>


<style type="text/scss" lang="scss" scoped>
$light_gray: #eee;
.el-card.comment.is-always-shadow {
  background-image: url("/img/bg.ab6d14fa.jpg");
  background-repeat: no-repeat;
  height: 730px;
  width: 1100px;
  overflow: hidden;
  background-size: 100%;
  position: relative;
}
.inputstayle {
  width: 30%;
}
.login {
  padding: 0px;
  position: absolute;
  width: 100%;
  top: 26%;
}
.el-input {
  display: inline-block;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
    &:-webkit-autofill {
      -webkit-text-fill-color: #fff !important;
    }
  }
}
</style>
