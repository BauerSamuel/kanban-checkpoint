<template>
  <div class="row">
    <div class="col-3 card">
      {{listData.title}}
      <p @click="deleteList(listData)"><i class="fas fa-trash"></i></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: ['listData'],
    mounted() {
      //this.$store.dispatch('getLists', this.$route.params.boardId)
    },
    computed: {
      lists() {
        return this.$state.store.lists;
      }
    },
    methods: {
      deleteList(listData) {
        this.$store.dispatch('deleteList', listData);
      }
    }
  }
</script>

<style scoped>
  .card {
    color: black;
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
    /* align-items: center !important; */
    /* max-width: 26%;
    min-height: 18vh; */
  }

  .deletebtn {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
    border-radius: 20px;
  }
</style>