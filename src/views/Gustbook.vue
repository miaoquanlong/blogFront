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
      <el-timeline-item :timestamp="item.dataTime|momentTime" placement="top" v-for="item in messages">
        <el-card>
          <h4>{{item.messageName}}说:</h4>
          <p v-if="!item.canEdit"> {{item.content}}</p>
          <el-form>
            <el-form-item>
              <el-input v-model="item.content" v-if="item.canEdit"></el-input>
            </el-form-item>
          </el-form>

          <el-timeline>
            <el-timeline-item v-for="(activity, index) in activities2" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>

          <el-button type="primary" size="mini" icon="el-icon-check" @click="replys(item.messageName)" v-if="item.userID  == $Cookies.get('Uid')">回复</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editemessage(item.userID,item.ID,item)" v-if="!item.canEdit&&item.userID  == $Cookies.get('Uid')">修改</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="ensuremessage(item.userID,item.ID,item)" v-if="item.canEdit&&item.userID  == $Cookies.get('Uid')">确认修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletemessage(item.userID,item.ID)" v-if="item.userID  == $Cookies.get('Uid')">删除</el-button>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <reply :show.sync="replyVisible" :messageName="messageNames"></reply>
  </div>
</template>

<script>
import reply from "@/components/reply";

export default {
  name: '',
  data () {
    return {
      form: {
        name: '',
        text: ''
      },
      activities2: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }],
      messageNames: '',
      replyVisible: false,
      messages: [],
      placeholder: `${this.$Cookies.get('name')},` + '留下您的精彩言论吧~~',
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    };
  },

  components: { reply },

  computed: {},



  methods: {
    //留言
    onSubmit () {
      this.$request.post('/api/message', {
        messageName: this.$Cookies.get('name'),
        content: this.form.text,
        userID: this.$Cookies.get('Uid'),
      }).then(res => {
        this.$message({
          message: res,
          type: 'success'
        })
        this.getmessage()
        this.clear()
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
        // this.messages = res
        let arr = []

        res.forEach(item => {
          if (item.userID && item.replyID) {
            if (item.userID == item.replyID) {
              arr.push({
                ID: item.ID,
                canEdit: item.canEdit,
                content: item.content,
                dataTime: item.dataTime,
                messageName: item.messageName,
                replyItem: [
                  {
                    replyID: item.replyID,
                    replyTime: item.replyTime,
                    replycontent: item.replycontent,
                    replyname: item.replyname,
                    userID: item.userID,
                  }
                ]
              })
            }
          }
        });
        console.log(arr);
        console.log(res);


      })

    },
    //清空输入的内容
    clear () {
      this.form.text = ''
    },
    //删除评论
    deletemessage (ID, messageID) {
      this.$request.post('/api/deletemessage', { userID: ID, messageID: messageID }).then(res => {
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
    //修改评论
    editemessage (ID, messageID, item) {
      item.canEdit = !item.canEdit
    },
    //确认修改
    ensuremessage (ID, messageID, item) {
      console.log(item);
      this.$request.post('/api/editmessage', { userID: ID, messageID: messageID, content: item.content }).then(res => {
        this.$message({
          message: res,
          type: 'success'
        })
        item.canEdit = !item.canEdit
        this.getmessage()
      })
        .catch(err => {
          this.$message({
            message: res,
            type: 'info'
          })
        })
    },
    //回复留言
    replys (name) {
      this.messageNames = name
      this.replyVisible = true
    }
  },
  created () {
    this.getmessage()
  }


}

</script>
<style lang='' scoped>
</style>