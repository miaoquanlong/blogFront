<template>
  <div>
    <!--  -->
    <a-row>
      <!-- 房间 -->

      <a-col :md="20" :lg="20">
        <a-card title="Room" class="chartbody">
          <div v-for="(item,index) in message" :key="index">
            <!-- <a href="#" slot="extra">more</a> -->
            <p class="chartName">{{item.username}}:</p>
            <p>{{item.content}}</p>
          </div>
        </a-card>
        <a-form>
          <a-form-item :label="$Cookies.get('name')" :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }">
            <a-input-search v-model="chartmessage.content" @search="submit" placeholder="说点什么吧~" size="large">
              <a-button slot="enterButton"> Go</a-button>
            </a-input-search>
          </a-form-item>
        </a-form>
      </a-col>

      <!-- 用户列表 -->
      <a-col :md="3" :lg="3">
        <a-card :title=" `当前在线${onlineusers}人`  " class="chartbody">
          <a href="#" slot="extra">more</a>
          <div v-for="(item,index) in usetList">
            <p>{{item}}</p>
          </div>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      input1: '',
      message: [],
      usetList: [],
      scrollTopHeight: 0,
      onlineusers: 0,
      chartmessage: {
        username: this.$Cookies.get('name'),
        content: '',
        chartimg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        userID: this.$Cookies.get('Uid'),
      }
    };
  },
  sockets: {
    //不能改,建立连接自动调用connect
    connect: function () {
      console.log(this.$Cookies.get('name') + "进入了房间");
    },
    //服务端向客户端发送login事件
    login: function (value) {
      this.message = value
    },
    //后端分发聊天内容高度
    scrollHeight: function (scrollHeight) {
      document.getElementsByClassName('chartbody')[0].scrollTop = scrollHeight
    },
    //广播用户进入聊天室
    userenter (val) {
      this.$message.success(val ? val + "进入了房间" : '一位不具名的调皮游客' + "进入了房间")
    },
    //广播用户离开聊天室
    userlogout (val) {
      this.$message.success(val[0] ? val[0] + "离开了房间" : '一位不具名的调皮游客' + "离开了房间")
      this.usetList = val[1]
    },
    //获取当前在线人员
    userList (val, length) {
      this.usetList = val[0]
      this.onlineusers = val[1]

    }
  },
  methods: {
    submit () {
      let that = this
      if (!Boolean(this.$Cookies.get('name'))) {
        this.$confirm({
          title: '尚未登陆,是否立即去登陆?',
          onOk () {
            that.$router.push('login')
          },
          onCancel () { },
        })
      }
      this.$socket.emit('compile', this.chartmessage, document.getElementsByClassName('chartbody')[0].scrollHeight);
      this.chartmessage.content = ""
    },
    //改变内容滚动高度
    scrollTop () {
      setTimeout(() => {
        let showContent = document.getElementsByClassName('chartbody')
        showContent[0].scrollTop = showContent[0].scrollHeight;
      }, 500);
    },

  },
  created () {
    this.scrollTop()
    this.$socket.emit('enter', this.$Cookies.get('name'))
  },
  destroyed () {
    this.$socket.emit('userleave', this.$Cookies.get('name'))
  }
};
</script>
<style lang="scss" scoped>
.ant-col-md-20.ant-col-lg-20 {
  margin-right: 20px;
}
form.ant-form.ant-form-horizontal {
  margin-top: 20px;
}
.chartName {
  font-size: 12px;
  color: deeppink;
  font-family: cursive;
}
.chartbody {
  height: 600px !important;
  overflow: auto !important;
}
</style>
