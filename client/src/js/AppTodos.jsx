import React from 'react';
import axios from 'axios';
import TodosList from './TodosList.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import '../../css/style.scss';

class AppTodos extends React.Component {
  constructor(props) {
    super(props);
    this.userId = props.userId;
    this.todos = [];
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.isNew = true;
    this.state = {
      todoslist: []
    };
  }

  componentDidMount() {
    this.getTodosForUser(this.userId);
  }

  addTodo(todo) {
    this.todos.unshift({
      id: this.todos.length + 1,
      description: todo.description,
      suggestedBy: 0,
      acceptedOn: null,
      dueOn: null,
      isDone: false,
      doneOn: null
    });
    this.updateTodosForUser(this.userId, this.todos);
    this.setState({ todoslist: this.todos });
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.updateTodosForUser(this.userId, this.todos);
    this.setState({ todoslist: this.todos });
  }

  markTodoDone(index) {
    let todo = this.todos[index];
    this.todos.splice(index, 1);
    todo.isDone = !todo.isDone;
    todo.isDone ? this.todos.push(todo) : this.todos.unshift(todo);
    this.updateTodosForUser(this.userId, this.todos);
    this.setState({ todoslist: this.todos });
  }

  getTodosForUser(userId) {
    axios.get(`/api/todos/user/${userId}`, { crossdomain: true })
      .then((todosList) => {
        if (todosList.data !== null) {
          this.todos = todosList.data.todos;
          this.isNew = false;
        } else {
          this.todos = [];
        }
        this.setState({
          todosList: this.todos
        });
      })
      .catch(err => {
        console.log('Error retrieving todos for user ', userId);
      });
  }

  updateTodosForUser(userId, todos) {
    let todosList = {
      id: userId,
      user_id: userId,
      todos: todos
    }
    if (this.isNew) {
      axios.post(`/api/todos/user/${userId}`, todosList)
        .then(function (response) {
          this.isNew = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.put(`/api/todos/user/${userId}`, todosList)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="div-app-todos">
        <AddTodoForm addTodo={this.addTodo}></AddTodoForm>
        <div className="div-todos-app">
          <TodosList todosList={this.todos} deleteTodo={this.deleteTodo} markTodoDone={this.markTodoDone}></TodosList>
        </div>
      </div>
    );
  }
}

export default AppTodos;
