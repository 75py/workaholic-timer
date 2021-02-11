<template>
  <div id="header"
       v-show="expand">
    <h1 v-on:click="expand = !expand">Workaholic Timer</h1>
    <div id="nav">
      <router-link to="/">Player</router-link>
      |
      <router-link to="/preference">Preference</router-link>
    </div>
  </div>
  <router-view v-on:click="expand = !expand"/>
</template>

<script>
export default {
  data() {
    return {
      expand: true,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
