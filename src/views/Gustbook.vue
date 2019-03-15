<template>
  <div>
    <a-card>
      <a slot="extra">more</a>
      <!-- <h3>Guestbook</h3> -->
      <h4> 欢迎给我留言~或者提出建议交流哦</h4>
      <h4> 本项目纯粹学习练手使用</h4>
      <h4> 感谢以下亲们的大力支持~想上墙 多灌水~~</h4>
    </a-card>

    <a-list class="comment-list" :pagination="pagination" :header="`${messages.length} 条评论`" itemLayout="horizontal" :dataSource="messages">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment :author="item.author" :avatar="item.avatar">
          <template slot="actions">
            <span key="star-o">
              <a-icon type="star-o" style="margin-right: 8px" @click="startclick()" />
              {{item.start}}
            </span>
            <span key="like-o">
              <a-icon type="like-o" style="margin-right: 8px" @click="likeclick()" />
              {{item.endorsed}}
            </span>
            <span key="message">
              <a-icon type="message" style="margin-right: 8px" @click="replys(item.messageName,item)" />
              {{30}}
            </span>
          </template>
          <template>
            <span style="margin:5px">
              <a-button type="primary" icon="bulb" :size="size" @click="replys(item.messageName,item)" value=""> 回复</a-button>
            </span>
            <span style="margin:5px">
              <a-button type="primary" icon="edit" :size="size" @click="editemessage(item.userID,item.ID,item)" v-if="!item.canEdit&&item.userID  == $Cookies.get('Uid')">修改</a-button>
            </span>
            <span style="margin:5px">
              <a-button type="primary" icon="safety" :size="size" @click="ensuremessage(item.userID,item.ID,item)" v-if="item.canEdit&&item.userID  == $Cookies.get('Uid')">确认修改</a-button>
            </span>
            <span style="margin:5px">
              <a-button type="primary" icon="delete" :size="size" @click="deletemessage(item.userID,item.ID)" v-if="item.userID  == $Cookies.get('Uid')">删除</a-button>
            </span>
          </template>
          <p slot="content">{{item.content}}</p>
          <a-input v-model="item.content" v-if="item.canEdit"></a-input>
          <a-comment v-for="(activity, index) in item.children">
            <a slot="author">{{activity.replyname}}:</a>
            <template slot="actions">
              <span key="star-o">
                <a-icon type="star-o" @click="startclick()" />
                {{item.start}}
              </span>
              <span key="like-o">
                <a-icon type="like-o" @click="likeclick()" />
                {{item.endorsed}}
              </span>
            </template>
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
            <p slot="content">{{activity.replycontent}}</p>
          </a-comment>
        </a-comment>
      </a-list-item>
    </a-list>

    <div slot="content">
      <a-textarea :rows="4" v-model="form.text" :placeholder="placeholder"></a-textarea>
      <span style="margin:15px">
        <a-button htmlType="submit" :loading="submitting" @click="onSubmit" type="primary">
          立即评论
        </a-button>
      </span>
      <span>
        <a-button @click="clear">三思一下~~</a-button>
      </span>
    </div>

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
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      size: 'small',
      submitting: false,
      messageNames: '',
      messageID: '',
      replyVisible: false,
      messages: [],
      placeholder: `${this.$Cookies.get('name')},` + '留下您的精彩言论吧~~',
      //   currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    }

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
        this.$message.success(res);
        this.getmessages()
        this.clear()
      }).catch(err => {
        this.$message.error(err);
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
            if (item.messageID && _.find(acc, { ID: item.messageID })) {
              if (item.messageID === _.find(acc, { ID: item.messageID }).ID) {
                _.find(acc, { ID: item.messageID }).children.push({
                  "replyname": item.replyname,
                  "replycontent": item.replycontent,
                  "messageID": item.messageID,
                  "replyTime": item.replyTime
                })
              }
            }
            that.messages = acc
          })
        }));
    },
    //清空输入的内容
    clear () {
      this.form.text = ''
    },
    //删除评论
    deletemessage (ID, messageID) {
      this.$request.post('/api/deletemessage', { userID: ID, messageID: messageID }).then(res => {
        this.$message.success(res);

        this.getmessages()
      }).catch(err => {
        this.$message.error(err);
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
        this.$message.success(res);
        item.canEdit = !item.canEdit
        this.getmessages()
      })
        .catch(err => {
          this.$message.error(err);
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