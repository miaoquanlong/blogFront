<template>
  <div>
    <!-- <el-dialog :title="replyTitle" :visible.sync="replyView" :show="show" width="60%" @close="$emit('update:show',false)">
      <el-form :model="form" label-width="100px">
        <el-form-item label="回复内容:">
          <el-input type="textarea" v-model="replycontent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="replymessage">确 定</el-button>
      </div>
    </el-dialog> -->

    <!-- <a-button type="primary" @click="showModal"></a-button> -->
    <a-modal :title="replyTitle" :confirmLoading="confirmLoading" v-model="replyView" :show="show" @ok="replymessage">
      <a-form :model="form" label-width="100px">
        <a-form-item label="回复内容:">
          <a-input type="textarea" v-model="replycontent" autocomplete="off"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script>

export default {
  name: '',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    messageName: {
      type: String,
      default: false
    },
    messageID: {
      type: String | Number,
      default: false
    }
  },
  data () {
    return {
      replyView: this.show,
      confirmLoading: false,
      replyTitle: '',
      replycontent: '',
      form: {
        name: '',
        region: ''
      }

    };
  },

  components: {
  },

  computed: {

  },

  created () {
  },

  methods: {
    //回复人用户名，回复内容，回复人ID 回复时间(服务端获取当前时间)
    replymessage () {
      this.confirmLoading = true;
      this.$request.post('/api/reply', {
        replyname: this.$Cookies.get('name'),
        replycontent: this.replycontent,
        messageID: this.messageID,
        replyID: this.$Cookies.get('Uid')
      }).then(res => {
        this.$message.success('回复成功');
        this.confirmLoading = false;
      }).catch(err => {
        this.$message.error(err);
        this.confirmLoading = false;
      })
      this.$emit('update:show', false)
      this.$emit('reload', true)

    },
    //取消回复
    close () {
      this.replycontent = ''
      this.$emit('update:show', false)
    }

  },
  watch: {
    show: {
      immediate: true,
      handler: function () {
        if (this.show) {

        }
        this.replyView = this.show;
        this.replyTitle = '回复' + `${this.messageName}` + ':'
      }
    }
  },


}

</script>
<style lang='' scoped>
</style>