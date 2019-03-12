<template>
  <div class="board col-12">
    <h1>{{board.title}}</h1>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button class="" type="submit">Create List</button>
    </form>
    <list v-for="list in lists" :listData='list'>

    </list>
  </div>
</template>

<script>
  export default {
    name: "board",
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      }
    },
    data() {
      return {
        newList: {
          title: '',
          description: '',
          board: this.boardId
        }
      }
    },
    methods: {
      addList() {
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", description: "" };
      },
      deleteList(list) {
        this.$store.dispatch("deleteList", list)
      }
    },
    props: ["boardId"]
  };
</script>