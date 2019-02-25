 <template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item v-for="(item,index) in route" :key="index" :index="item.name" 
        @click="$router.push(item.path)">{{item.name}}</el-menu-item>
      </el-menu>
      <!-- <transition name="fade"
              mode="out-in">
    <router-view />
  </transition> -->
    </div>
  </template>

<script>

  export default {
    name:'navbar',
    props:[''],
    data () {
      return {
          isCollapse: true,
          route:[],
          activeIndex:"1"
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
     
    },
    created() {
      // console.log(this.$router.options.routes)
      this.route = this.$router.options.routes
    },

    watch: {}

  }

</script>
<style lang='' scope=true>
 /* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */

</style>