<template>
  <div id="app">
    <Add />
    <router-view/>
  </div>
</template>

<script>
import Add from '@/components/Add.vue'
export default {
  name: 'App',
  components: {
    Add
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
