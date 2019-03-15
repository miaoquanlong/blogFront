<template>
  <div>
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
          <a-avatar icon="user" style="margin: 15px;cursor: pointer" v-if="this.$Cookies.get('name')" />
          <a-dropdown>
            <span v-if="!this.$Cookies.get('name')"> 游客
              <a-icon type="down" /> </span>
            <span v-else>欢迎你: {{this.$Cookies.get('name')}}
              <a-icon type="down" /> </span>
            <a-menu slot="overlay">
              <a-menu-item @click="logins" key="1" :disabled="Boolean(this.$Cookies.get('name'))">登陆</a></a-menu-item>
              <a-menu-item @click="logout" key="2" :disabled="Boolean(!this.$Cookies.get('name'))">登出</a></a-menu-item>
              <a-menu-item>注销</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          </a-header>
        </a-layout-header>

        <a-layout-content :style="{ margin: '50px 10px 10px 10px' }">
          <div :style="{ padding: '24px',  minHeight: '360px',}">
            <app-main />
          </div>
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
          created by herry
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
    },
    onBreakpoint (broken) {
    },
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