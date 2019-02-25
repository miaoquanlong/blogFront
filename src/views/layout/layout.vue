<template>
  <div>
    <navbar/>
    <transition name="fade"
              mode="out-in">
    <router-view />
  </transition>
  </div>
</template>

<script>
import { navbar } from "./components";

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {navbar},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>