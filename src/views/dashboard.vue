<template>
  <div>
    <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        <template slot="actions">
          <span key="star-o">
            <a-icon type="star-o" style="margin-right: 8px" @click="startclick()" />
            {{item.start}}
          </span>
          <span key="like-o">
            <a-icon type="like-o" style="margin-right: 8px" @click="likeclick()" />
            {{item.collectionCount}}
          </span>
          <span key="message">
            <a-icon type="message" style="margin-right: 8px" @click="messageclick()" />
            {{item.commentsCount}}
          </span>
        </template>
        <img v-if="item.url" slot="extra" alt="logo" :src="item.url" style="max-height:123px;width:auto" />
        <a-list-item-meta :description="item.description">
          <a slot="title" :href="item.href">{{item.title}}</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a-list-item-meta>
        {{item.desc}}
      </a-list-item>
    </a-list>

  </div>
</template>

<script>

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
      listData: []
    };
  },

  components: {},

  computed: {},



  methods: {
    getJuejin () {
      this.$request.get('/api/artic/juejin').then(res => {
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
<style lang='scss' scoped>
</style>