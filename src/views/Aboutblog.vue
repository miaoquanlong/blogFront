<template>
  <div>
    <a-row v-for="(item,index) in aboutArtic" :key="index">
      <a-card title="关于博客" :bordered="false">
        <a-button type="primary" slot="extra">点我~~点我</a-button>
        <a-form label-width="100px">
          <div style="padding: 14px;">
            <a-row>
              <a-col>
                <a-form-item label="学校:">
                  {{item.school}}
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item label="QQ:">
                  {{item.qq}}
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item label="喜好:">
                  {{item.Like}}
                </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col>
                <a-form-item label="Email:">
                  {{item.email}}
                </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col>
                <a-form-item label="感谢:">
                  {{item.thanks}}
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item label="微博:">
                  {{item.signAddress}}
                </a-form-item>
              </a-col>
            </a-row>

            <div class="bottom clearfix">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <!-- <a-button type="text" class="button">点我~~点我</a-button> -->
            </div>
          </div>

        </a-form>
      </a-card>
    </a-row>
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