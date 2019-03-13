 <template>
  <div>
    <el-menu :default-active="$route.path" 
    class="el-menu-demo" mode="horizontal"
     @select="handleSelect" 
     text-color="#4c4c4c" 
     active-text-color="#1379b1">
      <el-menu-item 
      v-for="(item,index) in route" 
      :key="index" :index="item.name" 
      @click="$router.push(item.path)">{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'navbar',
  props: [''],
  data () {
    return {
      isCollapse: false,
      route: [],
      activeIndex: "1"
    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);


    }
  },
  created () {
    console.log(this.$router.options)
    console.log(this.$route.path);

    this.route = this.$router.options.routes
  },

  watch: {}

}

</script>
<style lang='scss' scope=true>
</style>