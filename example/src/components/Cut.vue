<template>
  <div>
    <span>a + b={{$store.test.a}}+{{$store.test.b}}={{$store.test.c}}</span>
    <button @click="add">a+1</button>
    <button @click="cut">b-1</button>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  methods:{
    add(){
      this.$store.test.changeA(this.$store.test.a+1);
    },
    cut(){
      this.$store.test.b--;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
