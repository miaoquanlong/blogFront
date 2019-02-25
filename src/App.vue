<template>
  <div id="app">
      <navbar/>
  </div>
</template>

<script>
import  navbar  from "@/views/layout/components/navbar";


export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style  scoped>
#app {
  height: 100%;
}
</style>
