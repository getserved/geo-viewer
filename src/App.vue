<template>
  <div id="app">
    <GeoViewer/>
  </div>
</template>

<script>
import GeoViewer from './components/GeoViewer.vue'

export default {
  name: 'App',
  components: {
    GeoViewer
  }
}
</script>

<style>
html{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
