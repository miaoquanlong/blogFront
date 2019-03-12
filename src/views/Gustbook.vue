<template>
  <div>
    <el-row>
      <el-col :lg="24" :md="12">
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
              <!-- <el-button type="text" class="button">点我~~点我</el-button> -->
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

          <el-timeline v-if="item.children">
            <el-timeline-item v-for="(activity, index) in item.children" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.replyTime|momentTime">
              {{activity.replyname}}:{{activity.replycontent}}
            </el-timeline-item>
          </el-timeline>

          <el-button type="primary" size="mini" icon="el-icon-check" @click="replys(item.messageName,item)">回复</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editemessage(item.userID,item.ID,item)" v-if="!item.canEdit&&item.userID  == $Cookies.get('Uid')">修改</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="ensuremessage(item.userID,item.ID,item)" v-if="item.canEdit&&item.userID  == $Cookies.get('Uid')">确认修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletemessage(item.userID,item.ID)" v-if="item.userID  == $Cookies.get('Uid')">删除</el-button>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <reply :show.sync="replyVisible" :messageName="messageNames" :messageID="messageID" @reload="reload"></reply>
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
      messageNames: '',
      messageID: '',
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
    getmessage () {
      return this.$request.get('/api/getmessage')
    },
    getreply () {
      return this.$request.get('/api/getreply');
    },

    //获取留言
    getmessages () {
      let that = this
      this.$request.all([this.getmessage(), this.getreply()])
        .then(this.$request.spread(function (acc, pers) {
          acc = acc.map(itemC => {
            return {
              ID: itemC.ID,
              canEdit: itemC.canEdit,
              content: itemC.content,
              dataTime: itemC.dataTime,
              messageName: itemC.messageName,
              userID: itemC.userID,
              children: []
            }
          })
          pers.forEach(item => {
            if (item.messageID === _.find(acc, { ID: item.messageID }).ID) {
              _.find(acc, { ID: item.messageID }).children.push({
                "replyname": item.replyname,
                "replycontent": item.replycontent,
                "messageID": item.messageID,
                "replyTime": item.replyTime
              })
            }
          })
          that.messages = acc
        }));
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
    replys (name, item) {
      this.messageNames = name
      this.messageID = item.ID
      this.replyVisible = true
    },
    //回复过后重载数据
    reload () {
      this.getmessages()
    }
  },
  created () {
    this.getmessages()
  }


}

</script>
<style lang='' scoped>
</style>