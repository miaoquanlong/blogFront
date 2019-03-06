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
    <!-- 发布留言 -->
    <el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="留言板:">
          <el-input type="textarea" v-model="form.text" :placeholder="placeholder"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即评论</el-button>
          <el-button @click="clear">三思一下~~</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 查看留言 -->
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top" v-for="item in messages">
        <el-card>
          <h4>{{item.messageName}}</h4>
          <p> {{item.content}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      form: {
        name: '',
        text: ''
      },
      messages: [],
      placeholder: `${this.$Cookies.get('name')},` + '留下您的精彩言论吧~~',
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()

    };
  },

  components: {},

  computed: {},



  methods: {
    //留言
    onSubmit () {
      this.$request.post('/api/message', {
        messageName: this.$Cookies.get('name'),
        content: this.form.text
      }).then(res => {
        this.$message({
          message: res,
          type: 'success'
        })
        this.getmessage()
      }).catch(err => {
        this.$message({
          message: err,
          type: 'info'
        })
      })
    },
    //获取留言
    getmessage () {
      this.$request.get('/api/getmessage').then(res => {
        this.messages = res
      })

    },
    //清空输入的内容
    clear () {
      this.form.text = ''
    }
  },
  created () {
    this.getmessage()
  }


}

</script>
<style lang='' scoped>
</style>