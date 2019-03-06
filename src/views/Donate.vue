<template>
  <div>
    Donate
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {

    };
  },

  components: {},

  computed: {},



  methods: {
    // aa (...num) {
    //   console.log(num.reduce((x, y) => { return x * y }));
    // },
    num1 (x) {
      const result = y => this.num1(x * y);
      result.toString = () => x;
      console.log(result);
      return result;


    }

  },
  created () {
    // this.aa(4)(3)(4)
    this.num1(2)(3)(4)

  }


}

</script>
<style lang='' scoped>
</style>