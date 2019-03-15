import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { get } from 'https';

Vue.use(Vuex)

//Allows axios to work locally OR live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
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
    addTask({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId

      api.post(`boards/${boardId}/lists/${listId}/tasks`, dataObject.newTask)
        .then(res => {
          debugger
          dispatch('getTasks', dataObject)
        })
    },
    changeTask({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId
      let updatedTask = dataObject.taskMoved
      api.put(`boards/${boardId}/lists/${listId}/tasks/${updatedTask._id}`, updatedTask)
        .then(res => {
          dispatch('getTasks', dataObject)
          dispatch('getTasks', { boardId, listId: dataObject.oldListId })
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
    },
    addComment({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId
      let taskId = dataObject.comment.taskId
      api.put(`boards/${boardId}/lists/${listId}/tasks/${taskId}/comments`, dataObject.comment)
        .then(res => {
          dispatch('getTasks', dataObject)
        })
    },
    deleteComment({ commit, dispatch }, dataObject) {
      let boardId = dataObject.boardId
      let listId = dataObject.listId
      let taskId = dataObject.taskId
      api.put(`boards/${boardId}/lists/${listId}/tasks/${taskId}/comments`, dataObject.comment)
        .then(res => {
          dispatch('getTasks', dataObject)
        })
    }


    //#endregion
  }
})
