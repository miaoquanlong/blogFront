<template>
  <div>
    <el-row>
      <el-col v-for="(item,index) in HomeArtic" :key="index">
        <el-card :body-style="{ padding: '0px',}">
          <div style="padding: 14px;">
            <div>
              <h3>{{item.title}}</h3>
              <h4> {{item.subtitle}}</h4>
              <el-steps :active="9" align-center>
                <el-step title="步骤1" description="React（随便瞎用用）Clear"></el-step>
                <el-step title="步骤2" description="学 Go（还没有用的跟 JS 一样熟练） Clear。"></el-step>
                <el-step title="步骤3" description="五十音（又忘了） Clear。"></el-step>
                <el-step title="步骤4" description="写几个开源项目（倒过来说应该是写了几个小项目顺手开源了）Clear。"></el-step>
                <el-step title="步骤5" description="英文社区养成习惯（瞎几把刷）Clear。。"></el-step>
                <el-step title="步骤6" description="微小的设计（我倒是学了 PS 但是没什么卵用）Clear。。"></el-step>
                <el-step title="步骤7" description="每周更新博客（请大家忘了这件事情吧）。"></el-step>
                <el-step title="步骤8" description="GraphQL （老忘记开坑）。"></el-step>
                <el-step title="步骤9" description="升职加薪（还不知道哦）。"></el-step>
              </el-steps>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">点我~~点我</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data () {
    return {
      HomeArtic: [],
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    teseapi () {
      this.$request.get('/api/Home').then(res => {
        this.HomeArtic = res
        console.log(res);
      })
    }
  },

  watch: {},
  created () {
    this.teseapi()
    // console.log(this.$request)
  },

}

</script>
<style lang='scss' scoped>
</style>