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
            <el-menu :default-openeds="['1']" :collapse-transition="true" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <navbar />
              </el-submenu>
            </el-menu>
          </el-footer>
        </el-container>
      </el-aside>
      <el-main>
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
      isCollapse: true
    };
  },

  components: { navbar, AppMain },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
  },

  watch: {}

}

</script>
<style lang='scss' scoped>
</style>