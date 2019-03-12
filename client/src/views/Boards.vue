<template>
  <div class="col-12 boards">
    <h3>WELCOME BANNER HERE</h3>
    <form @submit.prevent="addBoard">
      <input class="createboard" type="text" placeholder="title:" v-model="newBoard.title" required>
      <input class="createboard" type="text" placeholder="description:" v-model="newBoard.description">
      <button class="createboard" type="submit">Create Board <i class="fas fa-external-link-alt"></i></button>
    </form>
    <div class="row d-flex justify-content-around">
      <div class="col-4 card" v-for="board in boards" :key="board._id">
        <router-link class="colorpls" :board="board" :to="{name: 'board', params: {boardId: board._id}}">
          <h1>
            {{board.title}}</h1>
        </router-link>
        <button class="btn-danger deletebtn" @click="deleteBoard(board._id)"><i class="fas fa-trash"></i></button>
        <hr>
        <div class="card-bottom text-center">
          <h3>Lists Here</H3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    }
  };
</script>
<style>
  .card {
    color: black;
    /* background-image: url('https://vignette.wikia.nocookie.net/edwikia/images/0/0d/Plank.png/revision/latest/scale-to-width-down/338?cb=20170726093347'); */
    background-repeat: no-repeat;
    background-size: 400px 150px;
    background-color: rgba(0, 0, 0, 0.192);
    border-top-color: black;
    border-right-color: black;
    border-right-style: solid;
    border-top-style: solid;
    letter-spacing: 1px;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin-top: 3vh;
    /* align-items: center !important; */
    max-width: 26%;
    min-height: 18vh;
  }

  .card-bottom {
    color: white;
    text-shadow: -3px -1px black;
    letter-spacing: 1px;
    padding-top: 1vh;
    padding-bottom: 1vh;
  }

  .deletebtn {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
    border-radius: 20px;
  }

  .colorpls {
    color: white;
    text-shadow: -3px -1px black;
  }

  .createboard {
    border-radius: 10px;
    margin-left: 1vw;
  }
</style>