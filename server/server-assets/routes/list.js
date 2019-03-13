let router = require('express').Router()
let Lists = require('../models/list')

//GET
router.get('/:boardId/lists', (req, res, next) => {
  Lists.find({ authorId: req.session.uid, boardId: req.params.boardId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/:boardId/lists', (req, res, next) => {
  req.body.authorId = req.session.uid
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:boardId/lists/:listId', (req, res, next) => {
  Lists.findById(req.params.listId)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
router.delete('/:boardId/lists/:listId', (req, res, next) => {
  Lists.findById(req.params.listId)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      })
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})

let taskRoutes = require('./task')
router.use('/:boardId/lists', taskRoutes)
module.exports = router