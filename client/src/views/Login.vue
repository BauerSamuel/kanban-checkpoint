<template>
  <div class="col-12 login">
    <form v-if="loginForm" @submit.prevent="loginUser">
      <input type="email" v-model="creds.email" placeholder="email">
      <input type="password" v-model="creds.password" placeholder="password">
      <button type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name">
      <input type="email" v-model="newUser.email" placeholder="email">
      <input type="password" v-model="newUser.password" placeholder="password">
      <button type="submit">Create Account</button>
    </form>
    <div class="action" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
    <div class="row">
      <div class="titlez col-12">
        <img src="../../public/LoginTitle.png">
      </div>
      <div class=" col-3">
        <br>
        <a href="https://youtu.be/8l5ZjSI5G4E"><img class="grouch fa-pulse" src="../../public/Oscar.png"
            alt="grouch"></a>
      </div>
      <div class="sayin col-6">
        <img src="../../public/GrouchSubtitle.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
  }

  .sayin {
    margin-top: 45vh;
  }

  .titlez {
    justify-content: left;
    display: flex;
    padding-left: 2vw;
  }

  .grouch {
    margin-left: 8vw;
  }
</style>