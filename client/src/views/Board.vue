<template>
  <div class="board col-10 offset-1">
    <h1 class="title"><b>{{board.title}} </b><span id="lister"><i @click="seen = !seen"
          class="far fa-calendar-plus"></i></span></h1>
    <h5 class="stitle"><i>--{{board.description}}</i></h5>
    <form class="" @submit.prevent="addList">
      <input type="text" v-if="seen" placeholder="  LIST TITLE:" v-model="newList.title" required>
      <!-- <input type="text" placeholder="description" v-model="newList.description"> -->
      <button class="" v-if="seen" type="submit">Create List <i class="fas fa-external-link-alt"></i></button>
    </form>
    <div class="row d-flex justify-content-around">
      <list class="" v-for=" list in lists" :listData='list'>
      </list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    data() {
      return {
        seen: false,
        newList: {
          title: '',
          boardId: this.boardId
        }
      }
    },
    mounted() {
      this.$store.dispatch('getBoards')
      this.$store.dispatch('getLists', this.boardId)
    },
    computed: {
      board() {
        let test = this.$store.state.boards.find(b => b._id == this.boardId) || "loading..."
        return test
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      addList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch("addList", this.newList);

        this.newList = { title: "", description: "" };
      },
      deleteList(list) {
        this.$store.dispatch("deleteList", list)
      }
    },
    props: ["boardId"],
    components: {
      List
    }
  };
</script>
<style>
  #lister {
    font-size: 45px;
    color: #95af88;
    cursor: pointer;
    text-shadow: -1px -1px black;
  }

  .title {
    background-color: rgba(0, 0, 0, 0.445);
    color: white;
    text-shadow: -1px -1px black;
    letter-spacing: 5px;
    border-radius: 30px;
  }

  .stitle {
    background-color: rgba(0, 0, 0, 0.123);
    border-radius: 30px;
  }
</style>