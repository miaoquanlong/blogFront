<template>
  <div>
    <h1>首页啊啊啊啊</h1>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      teseapi() {
        this.$request({
          url:'edit?type=sanwen',
          method: 'GET'
        }).then(res => {
          console.log(res);
        })
      }
    },

    watch: {},
    created() {
      this.teseapi()
      console.log(this.$request) 
    },

  }

</script>
<style lang='' scoped>

</style>