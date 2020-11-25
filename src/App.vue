<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

#app {
  font-family: 'Gugi', cursive;
}

.badge {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
