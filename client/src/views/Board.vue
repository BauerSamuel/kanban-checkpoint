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
  import List from '@/components/List.vue'
  export default {
    name: "board",
    data() {
      return {
        newList: {
          title: '',
          description: '',
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