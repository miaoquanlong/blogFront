<template>
  <div>
    <a-row>
      <a-card title="关于我" v-for="(item,index) in aboutArtic" :key="index">
        <!-- <a href="#" slot="extra"> -->
        <a-button slot="extra" type="primary">点我~~点我</a-button>
        <!-- </a> -->

        <a-form label-width="100px">
          <div style="padding: 14px;">
            <a-row>
              <a-form-item label="关于我:">
                {{item.content}}
              </a-form-item>
            </a-row>
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
                <a-form-item label="微博:">
                  {{item.signAddress}}
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div> -->
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