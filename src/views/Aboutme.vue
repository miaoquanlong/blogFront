<template>
  <div>
    <el-row>
      <a-card title="关于我" v-for="(item,index) in aboutArtic" :key="index">
        <!-- <a href="#" slot="extra"> -->
        <a-button slot="extra" type="primary">点我~~点我</a-button>
        <!-- </a> -->

        <el-form label-width="100px">
          <div style="padding: 14px;">
            <el-row>
              <el-form-item label="关于我:">
                {{item.content}}
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="学校:">
                  {{item.school}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="QQ:">
                  {{item.qq}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="喜好:">
                  {{item.Like}}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item label="Email:">
                  {{item.email}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="微博:">
                  {{item.signAddress}}
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div> -->
          </div>

        </el-form>
      </a-card>
    </el-row>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      aboutArtic: [],
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    };
  },

  components: {},

  computed: {},
  created () {
    this.getmessage()
  },

  methods: {
    getmessage () {
      this.$request.get('/api/about').then(res => {
        this.aboutArtic = res
        console.log(res);
      })
    }
  },


}

</script>
<style lang='' scoped>
</style>