const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');

let mongoServer = process.env.MONGO_SERVER || 'localhost';
let mongoPort = process.env.MONGO_PORT || '27017';
let collection = 'todolist';
let mongoUri = `mongodb://${mongoServer}:${mongoPort}/${collection}`;
console.log(mongoUri);
let connection = mongoose.connect(mongoUri);

// User schema
const UserSchema = mongoose.Schema(
  {
    "id": { type: Number, unique: true },
    "first_name": String,
    "last_name": String,
    "login": String
  }
);

const TodoSchema = mongoose.Schema(
  {
    "id": {type: Number, unique: true},
    "description": String,
    "suggestedBy": Number,
    "acceptedOn": Date,
    "dueOn": Date,
    "isDone": Boolean,
    "doneOn": Date
  }
);

const TodoListSchema = mongoose.Schema(
  {
    "id": {type: Number, unique: true},
    "user_id": { type: Number, unique: true },
    "todos": [TodoSchema]
  }
);

var TodoListModel = mongoose.model(collection, TodoListSchema);

function findOne(userId) {
  return TodoListModel
    .findOne({user_id: userId})
    .lean()
    .exec();
}

// insertOne inserts a todolist into the db
function insertOne(todoList) {
  return TodoListModel.create(todoList);
}

// update 
function updateOne(todoList) {
  return TodoListModel.findOneAndUpdate({'id': todoList.id}, todoList, {new: true});
}

// delete


module.exports = {
  insertOne: insertOne,
  findOne: findOne,
  updateOne: updateOne,
  connection: connection
};