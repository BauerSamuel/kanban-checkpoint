let router = require('express').Router()
let Tasks = require('../models/task')

//GET
router.get('/:listId/tasks', (req, res, next) => {
  Tasks.find({ authorId: req.session.uid, listId: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/:listId/tasks', (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:listdId/tasks/:taskId/comments', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      if (!req.body._id) {
        req.body.authorId = req.session.uid
        task.comments.push(req.body)
      } else {
        for (let i = 0; i < task.comments.length; i++) {
          let c = task.comments[i]
          if (c._id.toString() == req.body._id) task.comments.splice(i, 1)
        }
      }
      task.save()
      res.send("Comment successfully changed")
      return
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DELETE
router.delete('/:listdId/tasks/:taskId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})



module.exports = router