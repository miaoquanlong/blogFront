<template>
  <div>
    <el-container>
      <el-aside width="20%" height="100%">
        <el-container>
          <el-header>
            <el-row>
              <h2>清风哟哟~~</h2>
              <h4>博客,就要清爽，呦吼~~</h4>
            </el-row>
          </el-header>
          <el-footer>
            <el-row>
              <el-menu :default-openeds="['1']" :collapse-transition="true" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1">
                  <navbar />
                </el-submenu>
              </el-menu>
            </el-row>
            <el-row style="width:50%">
              <el-col>
                <el-input placeholder="搜索一下鸭~"></el-input>
              </el-col>
            </el-row>
          </el-footer>
        </el-container>
      </el-aside>
      <el-main>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;cursor: pointer"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="logins" :disabled="Boolean(this.$Cookies.get('name'))">登陆</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="logout" :disabled="Boolean(!this.$Cookies.get('name'))">登出</el-dropdown-item>
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-if="this.$Cookies.get('name')">欢迎你{{this.$Cookies.get('name')}}</span>
          <span v-else> 还没有登陆嗷~~：</span>
        </el-header>
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMain from '@/views/layout/components/AppMain'
import navbar from '@/views/layout/components/navbar'

export default {
  name: '',
  props: [''],
  data () {
    return {
      isCollapse: true,
      loginview: false
    };
  },

  components: { navbar, AppMain },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    logout () {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    logins () {
      this.$router.push({ name: 'login' })
    }
  },

  watch: {},

  created () {
  },
}

</script>
<style lang='scss' scoped>
</style>