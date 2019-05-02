export default{
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  methods: {
    changeA (value, vm) {
      this.a = value
      console.log('before:' + vm.innerText)
      this.$nextTick(() => {
        console.log('after:' + vm.innerText)
      })
    }
  },
  watch: {
    a (value) {
      console.log('a = ' + value)
    }
  },
  computed: {
    c () {
      return this.a + this.b
    }
  }
}
