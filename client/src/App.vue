<template>
  <div class="container-fluid">
    <div class="row" id="app">
      <div id="nav" class="col-12 navr">

        <router-link tag="button" class="btn boardbtn" to="/boards"><i class="fas fa-chalkboard-teacher"></i> Boards
        </router-link>
        <a href="https://i.gifer.com/cW2.gif"><img src="../public/Oscar.png" alt="grouch" class="smallerImg"></a>
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
    background-image: url('../public/OscarBGunblur.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    align-content: flex-start;

  }



  #nav {
    padding: 20px;
  }

  .navr {
    margin-bottom: -40px;
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

  .smallerImg {
    max-height: 100px;
    margin-right: -30px;
    margin-left: -6px;
    margin-top: -10px;
    margin-bottom: 20px
  }
</style>