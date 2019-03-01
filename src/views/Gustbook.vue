<template>
  <div>
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px',}">
          <div style="padding: 14px;">
            <div style="text-align: -webkit-center;">
              <h3>Guestbook</h3>
              <h4> 歡迎留言給我提出建議或者進行純交流哦~</h4>
              <h4> 友情链接及其他相关内容请先去Link阅读后再来申请~</h4>
              <h4> 感谢以下亲们的大力支持~想上墙 多灌水~~</h4>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">点我~~点我</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="12" :lg="8">
        <el-card class="comment" shadow="always">
          <div slot="header" class="clearfix">
            <span>评论人昵称</span>
            <el-button style="float: right; padding: 3px 0" type="text">点我回复</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :md="12" :lg="8">
        <el-card class="comment" shadow="always">
          <div slot="header" class="clearfix">
            <span>评论人昵称</span>
            <el-button style="float: right; padding: 3px 0" type="text">点我回复</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :md="12" :lg="8">
        <el-card class="comment" shadow="always">
          <div slot="header" class="clearfix">
            <span>评论人昵称</span>
            <el-button style="float: right; padding: 3px 0" type="text">点我回复</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()

    };
  },

  components: {},

  computed: {},



  methods: {},


}

</script>
<style lang='' scoped>
</style>