<template>
  <div class="col-3 card list">
    <hr>
    <h2>
      <span id="tasker"><i @click="seen = !seen" class="fas fa-tasks"></i></span>
      {{listData.title}}
      <span id="smaller"><i @click=" deleteList(listData)" class="fas fa-trash"></i></span>
    </h2>

    <input type="text" v-if="seen" placeholder="Enter Task Here:" v-model="newTask.content" required>
    <button @click="addTask" v-if="seen" class="" type="button">Add Task <i
        class="fas fa-external-link-alt"></i></button>
    <hr>
    <task class="formatting" v-for=" task in tasks" :taskData='task'></task>
    <hr>
    <div class="">
      <h6 class="instructions">Drag And Drop Tasks Below</h6>
      <drop class="dropZone" @drop="handleDrop"></drop>
    </div>
  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  import { Drag, Drop } from 'vue-drag-drop'
  export default {
    name: 'List',
    props: ['listData'],
    components: { Drag, Drop },
    mounted() {
      //this.$store.dispatch('getLists', this.$route.params.boardId)
      this.$store.dispatch('getTasks', { boardId: this.listData.boardId, listId: this.listData._id })
    },
    data() {
      return {
        active: false,
        seen: false,
        newTask: {
          content: '',
          listId: this.listData._id
        },
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      tasks() {
        return this.$store.state.tasks[this.listData._id];
      }
      // // comments() {
      // //   return this.$store.state.tasks[this.listData._id].comments
      // // }
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
      handleDrop(data) {
        console.log(data.taskMoved.listId + " and new list is " + this.listData._id);
        let oldListId = data.taskMoved.listId;
        data.taskMoved.listId = this.listData._id
        let object = {
          boardId: this.listData.boardId,
          listId: this.listData._id,
          oldListId,
          taskMoved: data.taskMoved
        }
        this.$store.dispatch('changeTask', object)
      },
      dragz() {
        this.active = !this.active;
      }

    },
    // addComment(taskData) {
    //   this.newComment.taskId = taskData._id
    //   console.log(this.newComment.taskId)
    //   let object = {
    //     boardId: this.listData.boardId,
    //     listId: this.listData._id,
    //     comment: this.newComment
    //   }
    //   console.log(object.comment)
    //   this.$store.dispatch('addComment', object)
    // }
    components: {
      Task
    }
  }
</script>

<style scoped>
  .card {
    /* background-image: url('https://vignette.wikia.nocookie.net/edwikia/images/0/0d/Plank.png/revision/latest/scale-to-width-down/338?cb=20170726093347'); */
    /* background-repeat: no-repeat; */
    /* background-size: 400px 150px; */
    background-color: rgba(0, 0, 0, 0.445);
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
    min-width: 30%;
    min-height: 18vh;

  }

  .taskCard {
    background-color: rgba(180, 23, 23, 0.699);
    letter-spacing: 1px;
    border-top-color: rgba(195, 0, 255, 0.329);
    border-right-color: rgba(195, 0, 255, 0.329);
    border-right-style: solid;
    border-top-style: solid;
    text-align: left;
    padding: 1em;
  }

  .dropZone {
    display: flex;
    margin-bottom: 15px;
    background-image: url('http://www.staroceans.org/myprojects/vlc/extras/package/macosx/Resources/mainwindow/dropzone%402x.png');
    background-repeat: round;
    background-size: contain;
    justify-content: center;
    min-height: 6em;

  }

  hr {
    background-color: rgba(18, 18, 19, 0.329);
    height: 3px;
  }

  #smaller {
    font-size: 15px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    /* text-shadow: .5px .5px white;
    background-color: rgba(0, 0, 0, 0.493);
    border-radius: 5px; */
  }

  #tasker {
    font-size: 15px;
    cursor: pointer;
    text-shadow: .5px.5px black;
    color: #7e7eec;
    background-color: rgba(0, 0, 0, 0.103);
    border-radius: 5px;
  }

  #trashspan {
    font-size: 15px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    text-shadow: 0px 0px white;
  }

  .formatting {
    margin-bottom: 10px
  }

  .instructions {
    color: rgba(255, 255, 255, 0.466);
    background-color: rgba(0, 0, 0, 0.466);
    border-radius: 10px;
  }

  .hide {
    display: none;
  }

  .someclass:hover .hide {
    display: block;
  }
</style>