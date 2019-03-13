<template>
  <div class="container-fluid">
    <div class="row" id="app">
      <div id="nav" class="col-12">
        <router-link tag="button" class="btn boardbtn" to="/boards"><i class="fas fa-chalkboard-teacher"></i> Boards
        </router-link>
        <button class="btn logoutbtn" @click="logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
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
    font-family: 'Share Tech Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #020202;
    background-image: url('http://1.bp.blogspot.com/-9OzYeaBsw5E/T_Jp9FdOAxI/AAAAAAAAAV8/6i1QlXF39MM/s1600/1335671239477.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    align-content: flex-start;
  }

  #nav {
    padding: 20px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .boardbtn {
    background-color: #cc9ff1;
    border: 2px solid rgba(0, 0, 0, 0.452);
    margin-right: 20px;
  }

  .logoutbtn {
    background-color: #cc9ff1;
    border: 2px solid rgba(0, 0, 0, 0.452);
    margin-right: 5px;
  }
</style>