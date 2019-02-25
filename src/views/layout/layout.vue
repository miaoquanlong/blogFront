<template>
  <div>
     <!-- <navbar/>  -->
     
  <el-container class="el-container__full">
    <el-aside class="el-aside__fixed"
              width="auto">
      <!-- <sidebar :scrollbar-width="scrollbarWidth" /> -->
    </el-aside>
    <el-container>
      <el-header class="el-header__shadow">
        <navbar/>
      </el-header>
      <el-main>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import AppMain  from '@/views/layout/components/AppMain'
import navbar  from '@/views/layout/components/navbar'


  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {navbar, AppMain},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>