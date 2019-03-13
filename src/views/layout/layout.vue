<template>
  <div>
    <!-- <el-container>
      <el-aside width="20%" height="100%">
        <el-container>
          <el-header>
            <el-row>
              <h2>主标题~~~</h2>
              <h4>副标题~~</h4>
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
      <el-main class="appMains">
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;cursor: pointer"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="logins" :disabled="Boolean(this.$Cookies.get('name'))">登陆</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="logout" :disabled="Boolean(!this.$Cookies.get('name'))">登出</el-dropdown-item>
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-if="this.$Cookies.get('name')">欢迎你:{{this.$Cookies.get('name')}}</span>
          <span v-else> 还没有登陆嗷~~：</span>
        </el-header>
        <app-main />
      </el-main>
    </el-container> -->
    <a-layout id="components-layout-demo-responsive">
      <a-layout-sider breakpoint="lg" collapsedWidth="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
        <div class="logo" />
        <a-menu theme="dark" mode="inline">
          <a-menu-item v-for="(item,index) in route" :key="item.path" @click="$router.push(item.path)">
            <a-icon type="user" />
            <span class="nav-text">{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header :style="{ background: '#fff', padding: 5 }">
          <!-- <a-dropdown>
            <!-- <i class="a-icon-setting" style="margin-right: 15px;cursor: pointer"></i> -->
          <a-avatar icon="user" style="margin: 15px;cursor: pointer" v-if="this.$Cookies.get('name')" />
          <!-- <a-dropdown-menu slot="dropdown">
            <a-dropdown-item @click.native.prevent="logins" :disabled="Boolean(this.$Cookies.get('name'))">登陆</a-dropdown-item>
            <a-dropdown-item @click.native.prevent="logout" :disabled="Boolean(!this.$Cookies.get('name'))">登出</a-dropdown-item>
            <a-dropdown-item>注销</a-dropdown-item>
          </a-dropdown-menu> -->
          <a-dropdown>
            <a class="ant-dropdown-link" href="#" v-if="!this.$Cookies.get('name')"> 游客
              <a-icon type="down" /> </a>
            <a class="ant-dropdown-link" href="#" v-else>欢迎你: {{this.$Cookies.get('name')}}
              <a-icon type="down" /> </a>
            <a-menu slot="overlay">
              <a-menu-item @click="logins" key="1" :disabled="Boolean(this.$Cookies.get('name'))">登陆</a></a-menu-item>
              <a-menu-item @click="logout" key="2" :disabled="Boolean(!this.$Cookies.get('name'))">登出</a></a-menu-item>
              <a-menu-item>注销</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- <span v-if="this.$Cookies.get('name')">欢迎你:{{this.$Cookies.get('name')}}</span>
          <span v-else> 还没有登陆嗷~~：</span> -->
          </a-header>
        </a-layout-header>

        <a-layout-content :style="{ margin: '50px 10px 10px 10px' }">
          <div :style="{ padding: '24px',  minHeight: '360px',}">
            <app-main />
          </div>
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
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
      loginview: false,
      route: [],

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
      this.$router.push('login')
    },


    onCollapse (collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint (broken) {
      console.log(broken);
    }
  },

  watch: {},

  created () {
    this.route = this.$router.options.routes
  },
}

</script>
<style lang='scss' scoped>
#components-layout-demo-responsive .logo {
  //   height: 32px;
  background: rgba(255, 255, 255, 0.2);
  //   margin: 16px;
}
</style>