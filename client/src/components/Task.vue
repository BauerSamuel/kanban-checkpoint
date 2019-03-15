<template>
  <div class="task">
    <drag :transfer-data="{ taskMoved: taskData} ">
      <div class="taskCard">
        <h6>
          {{taskData.content}}
          <span id="trashspantwo"><i @click="deleteTask(taskData)" class="fas fa-ban"></i></span>
          <span id=""><i @click="formBool = !formBool" class="fas fa-comment-medical commentr"></i></span>
        </h6>
        <form @submit.prevent>
          <input v-if="formBool" type="text" placeholder=" Comment:" v-model="newComment.content" required>
          <button @click="addComment(taskData)" v-if="formBool" class="" type="submit">Comment <i
              class="fas fa-external-link-alt"></i></button>
        </form>
      </div>
      <div class="commentz" v-for="comment in taskData.comments">
        <p>{{comment.content}} <span id="trashspanthree"><i @click="deleteComment(comment)"
              class="fas fa-ban"></i></span>
        </p>
      </div>
    </drag>
  </div>
</template>

<script>
  import { Drag, Drop } from 'vue-drag-drop'
  export default {
    name: "Task",
    props: ['taskData'],
    components: { Drag, Drop },
    data() {
      return {
        formBool: false,
        newComment: {
          content: '',
          taskId: this.taskData._id
        }
      }
    },
    computed: {
      listData() {
        return this.$store.state.lists.find(l => l._id == this.taskData.listId)
      },
      tasks() {
        return this.$store.state.tasks[this.listData._id];
      }
      // comments() {
      //   return this.$store.state.tasks[this.listData._id].comments
      // }
    },
    methods: {
      addComment(taskData) {
        this.newComment.taskId = taskData._id
        let object = {
          boardId: this.listData.boardId,
          listId: taskData.listId,
          comment: this.newComment
        }
        this.$store.dispatch('addComment', object)
        this.newComment = {
          content: '',
          taskId: this.taskData._id
        }
      },
      deleteTask(taskData) {
        let object = {
          boardId: this.listData.boardId,
          listId: this.listData._id,
          task: taskData
        }
        this.$store.dispatch('deleteTask', object)
      },
      deleteComment(comment) {
        let object = {
          boardId: this.listData.boardId,
          listId: this.listData._id,
          taskId: this.taskData._id,
          comment: comment
        }
        this.$store.dispatch('deleteComment', object)
      }
    }
  }
</script>
<style>
  .taskCard {
    background-color: rgba(0, 0, 0, 0.432);
    letter-spacing: 1px;
    border-top-color: rgba(195, 0, 255, 0.329);
    border-right-color: rgba(195, 0, 255, 0.329);
    border-right-style: solid;
    border-top-style: solid;
    text-align: left;
    padding: 1em;
    border-radius: 25px;
    cursor: pointer;
    /* margin-top: 10px; */
  }

  .commentz {
    background-color: rgba(0, 0, 0, 0.692);
    /* letter-spacing: 1px; */
    /* border-top-color: rgba(195, 0, 255, 0.329);
    border-right-color: rgba(195, 0, 255, 0.329); */
    /* border-right-style: solid;
    border-top-style: solid; */
    text-align: left;
    padding-left: 3em;
    border-radius: 15px;
    margin-top: 5px;
    width: 20vw;
    float: right;

    margin-bottom: 1.5px;
  }

  #trashspantwo {
    font-size: 14px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    /* text-shadow: 0px 0px white; */
    float: right;
    padding: 5px;
  }

  #trashspanthree {
    font-size: 8px;
    color: rgba(255, 0, 0, 0.842);
    cursor: pointer;
    /* text-shadow: 0px 0px white; */
    float: right;
  }

  .commentr {
    font-size: 15px;
    color: #95af88;
    cursor: pointer;
    text-shadow: 0px 0px black;
    float: right;
    padding: 5px;
  }
</style>