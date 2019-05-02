export default{
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  methods: {
    changeA (value) {
      this.a = value
    },
    changeB (value) {
      this.change = value
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
