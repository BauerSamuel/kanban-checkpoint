<template>
  <div class="col-8 offset-2 boards">
    <hr>
    <h1><b><i>Welcome to BanKan</i></b></h1>
    <h4><i>Plan Your Future:</i></h4>
    <h6><i>--Living Life Outside of the Kan--</i></h6>
    <hr>
    <br>
    <form @submit.prevent="addBoard">
      <input class="createboard" type="text" placeholder="  TITLE:" v-model="newBoard.title" required>
      <input class="createboard" type="text" placeholder="  DESCRIPTION:" v-model="newBoard.description">
      <button class="createboard" type="submit">Create Board <i class="fas fa-external-link-alt"></i></button>
    </form>
    <div class="row d-flex justify-content-around">
      <div class="col-4 card " v-for="board in boards" :key="board._id">
        <h1>
          <router-link class="colorpls" :board="board" :to="{name: 'board', params: {boardId: board._id}}">
            {{board.title}}</router-link>
        </h1>
        <h1><span class="trash"><i class="fas fa-trash" @click="deleteBoard(board._id)"></i></span></h1>

        <hr>
        <h6 class="card-bottom">{{board.description}}</h6>

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
    background-color: rgba(0, 0, 0, 0.116);
    border-top-color: #cc9ff1;
    border-right-color: #cc9ff1;
    border-right-style: solid;
    border-top-style: solid;
    letter-spacing: 1px;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin-top: 10vh;
    margin-left: 1vw;
    margin-right: 1vw;
    /* align-items: center !important; */
    /* max-width: 33vw; */
    min-height: 25vh;

  }

  .card-bottom {
    color: white;
    text-shadow: -3px -1px black;
    letter-spacing: 1px;
    padding-top: 1vh;
    padding-bottom: 1vh;
  }

  .trash {
    display: inline-block;
    font-size: 15px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    text-shadow: 0px 0px white;
  }

  .colorpls {
    color: white;
    text-shadow: -3px -1px black;
  }

  .createboard {
    border-radius: 5px;
    margin-left: 1vw;
  }

  hr {
    background-color: #cc9ff1;
    height: 1px;
  }

  /* .boards {
    background-image: url('http://1.bp.blogspot.com/-9OzYeaBsw5E/T_Jp9FdOAxI/AAAAAAAAAV8/6i1QlXF39MM/s1600/1335671239477.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
  } */
</style>