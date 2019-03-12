<template>
  <div>
    <!-- <el-card :body-style="{ padding: '0px',}" class="comment">
      <el-form label-width="100px">
        <div style="padding: 14px;">
          <el-row>
            <h3>文章</h3>
          </el-row>
          <el-row>
            <el-collapse v-for="(item,index) in activeNames " :key="index">
              <el-collapse-item :title="item.title" :name="item.ID">
                <div>{{item.content}}</div>
              </el-collapse-item>
            </el-collapse>

          </el-row>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
          </div>
        </div>
      </el-form>
    </el-card> -->

    <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        <template slot="actions">
          <!-- <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" @click="startclick(type)" />
            {{text}}
          </span> -->
          <span key="star-o">
            <a-icon type="star-o" style="margin-right: 8px" @click="startclick()" />
            {{item.start}}
          </span>
          <span key="like-o">
            <a-icon type="like-o" style="margin-right: 8px" @click="likeclick()" />
            {{item.endorsed}}
          </span>
          <span key="message">
            <a-icon type="message" style="margin-right: 8px" @click="messageclick()" />
            {{30}}
          </span>
        </template>
        <img slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        <a-list-item-meta :description="item.description">
          <a slot="title" :href="item.href">{{item.title}}</a>
          <!-- <a-avatar slot="avatar" :src="item.originalUrl" style="width:100%;height:100%" /> -->
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a-list-item-meta>
        {{item.content}}
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
const listData = []

export default {
  name: '',
  data () {
    return {
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '  ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
      activeNames: [],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      actions: [
        { type: 'star-o', text: '156', },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
      listData
    };
  },

  components: {},

  computed: {},



  methods: {
    getJuejin () {
      this.$request.get('/api/artic/juejin').then(res => {
        console.log(res);
        this.listData = res
      })
    },
    startclick (val) {
      console.log(1);
    },
    likeclick (val) {
      console.log(2);

    },
    messageclick (val) {
      console.log(3);

    }
  },
  created () {
    this.getJuejin()
  }

}

</script>
<style lang='' scoped>
</style>