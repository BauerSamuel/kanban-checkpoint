<template>
  <div class="container-fluid">
    <div class="row" id="app">
      <div id="nav" class="col-12">
        <router-link tag="button" class="btn-danger" to="/boards"><i class="fas fa-chalkboard-teacher"></i>Boards
        </router-link>
        <button class="btn-danger" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    },
    data() {
      return {

      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #020202;
    background-color: rgb(161, 161, 159);
    min-height: 100vh;
    align-content: flex-start;
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