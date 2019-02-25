<template>
  <div id="app">
      <layout/>
  </div>
</template>

<script>
import  layout  from "@/views/layout/layout";


export default {
  name: 'app',
  components: {
    layout
  }
}
</script>

<style  scoped>
#app {
  height: 100%;
}
</style>
