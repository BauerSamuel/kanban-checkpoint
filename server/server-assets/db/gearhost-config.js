var mongoose = require('mongoose')
//mongodb://<Username>:<password>@<database server>/<server name>
var connectionString = "mongodb://bankan:student!@den1.mongo1.gear.host:27001/bankan" //CHANGE ME!!!!!
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})