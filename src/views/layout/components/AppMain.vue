<template>
  <div>
    <transition name="fade"
              mode="out-in">
    <router-view />
  </transition>
  </div>
</template>

<script>

  export default {
      name: 'AppMain',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {},
    
   

  }

</script>
<style lang='' scoped>

</style>