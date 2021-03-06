let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'


let comment = new Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true }
})


let schema = new Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  comments: [comment]
})

//CASCADE ON DELETE? Not needed when dealing with comment sub schema?



module.exports = mongoose.model(schemaName, schema)