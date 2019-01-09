<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <app-restau-detail></app-restau-detail>
  
  

</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Bienvenue sur l\'App Restaurant'
    }
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

h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
