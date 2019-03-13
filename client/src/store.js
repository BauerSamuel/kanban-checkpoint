import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, object) {
      Vue.set(state.tasks, object.listId, object.tasks)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'login' })
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --
    getLists({ commit, dispatch }, boardId) {
      api.get(`boards/${boardId}/lists`)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) {
      let boardId = listData.boardId
      api.post(`/boards/${boardId}/lists`, listData)
        .then(res => {
          dispatch('getLists', boardId)
        })
    },
    deleteList({ commit, dispatch }, listData) {
      let boardId = listData.boardId
      let listId = listData._id
      api.delete(`boards/${boardId}/lists/${listId}`)
        .then(res => {
          dispatch('getLists', boardId)
        })
    },
    //#endregion

    //#region -- TASKS --
    getTasks({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId
      api.get(`boards/${boardId}/lists/${listId}/tasks`)
        .then(res => {
          commit('setTasks', { listId, tasks: res.data })
        })
    },
    // {
    //   listId: listId,
    //   tasks: [allOurTasksOnDB]
    // }
    addTask({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId

      api.post(`boards/${boardId}/lists/${listId}/tasks`, dataObject.newTask)
        .then(res => {
          dispatch('getTasks', dataObject)
        })
    },
    deleteTask({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId
      let taskId = dataObject.task._id
      api.delete(`boards/${boardId}/lists/${listId}/tasks/${taskId}`)
        .then(res => {
          dispatch('getTasks', dataObject)
        })
    }


    //#endregion
  }
})
