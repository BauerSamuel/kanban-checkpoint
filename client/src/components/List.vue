<template>
  <div class="col-3 card">
    <hr>
    <h2>
      <span id="tasker"><i @click="seen = !seen" class="fas fa-tasks"></i></span>
      {{listData.title}}
      <span id="smaller"><i @click=" deleteList(listData)" class="fas fa-trash"></i></span>
    </h2>

    <input type="text" v-if="seen" placeholder="Enter Task Here:" v-model="newTask.content" required>
    <button @click="addTask" v-if="seen" class="" type="submit">Add Task <i
        class="fas fa-external-link-alt"></i></button>
    <hr>
    <div class="taskCard" v-for="task in tasks">
      <h6>{{task.content}} <span id="trashspan"><i @click="deleteTask(task)" class="fas fa-trash"></i></span></h6>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: ['listData'],
    mounted() {
      //this.$store.dispatch('getLists', this.$route.params.boardId)
      this.$store.dispatch('getTasks', { boardId: this.listData.boardId, listId: this.listData._id })
    },
    data() {
      return {
        seen: false,
        newTask: {
          content: '',
          listId: this.listData._id
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      tasks() {
        return this.$store.state.tasks[this.listData._id];
      }
    },
    methods: {
      deleteList(listData) {
        this.$store.dispatch('deleteList', listData);
      },
      addTask(listData) {
        let object = {
          boardId: this.listData.boardId,
          listId: this.listData._id,
          newTask: this.newTask
        }
        this.$store.dispatch('addTask', object)
        this.newTask = {
          content: '',
          listId: this.listData._id
        }
      },
      deleteTask(taskData) {
        let object = {
          boardId: this.listData.boardId,
          listId: this.listData._id,
          task: taskData
        }
        console.log(object)
        this.$store.dispatch('deleteTask', object)
      }
    }
  }
</script>

<style scoped>
  .card {
    /* background-image: url('https://vignette.wikia.nocookie.net/edwikia/images/0/0d/Plank.png/revision/latest/scale-to-width-down/338?cb=20170726093347'); */
    /* background-repeat: no-repeat; */
    /* background-size: 400px 150px; */
    background-color: rgba(0, 0, 0, 0.192);
    border-top-color: black;
    border-right-color: black;
    border-right-style: solid;
    border-top-style: solid;
    letter-spacing: 1px;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin-top: 3vh;
    color: white;
    text-shadow: -1px -1px black;
    letter-spacing: 2px;
    /* align-items: center !important; */
    /* max-width: 26%;
    min-height: 18vh; */
  }

  .taskCard {
    background-color: rgba(0, 0, 0, 0.192);
    letter-spacing: 1px;
    border-top-color: rgba(195, 0, 255, 0.329);
    border-right-color: rgba(195, 0, 255, 0.329);
    border-right-style: solid;
    border-top-style: solid;
    text-align: left;
    padding: 1em;
  }

  hr {
    background-color: rgba(18, 18, 19, 0.329);
    height: 3px;
  }

  #smaller {
    font-size: 15px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    text-shadow: 0px 0px white;
  }

  #tasker {
    font-size: 15px;
    cursor: pointer;
    text-shadow: -1px -1px black;
    color: #8c8cee;
  }

  #trashspan {
    font-size: 15px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    text-shadow: 0px 0px white;
  }
</style>