 <template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :default-openeds="this.$router.options.routes">
      <el-menu-item v-for="(item,index) in route" :key="index" :index="item.name" @click="$router.push(item.path)">{{item.name}}</el-menu-item>
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

  },
  created () {
    // console.log(this.$router.options.routes)
    this.route = this.$router.options.routes
  },

  watch: {}

}

</script>
<style lang='scss' scope=true>
</style>