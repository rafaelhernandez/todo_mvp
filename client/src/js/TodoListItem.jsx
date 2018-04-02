import React from 'react';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.index = parseInt(this.props.index);
    this.onClickCloseButton = this.onClickCloseButton.bind(this);
    this.onClickDoneButton = this.onClickDoneButton.bind(this);
  }
  onClickCloseButton() {
    this.props.deleteTodo(this.index);
  }
  onClickDoneButton() {
    this.props.markTodoDone(this.index);
  }
  render() {
    let todoClass = this.props.todo.isDone ? "div-todo-done" : "div-todo-pending";
    return (
      <div className="div-todoListItem">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDoneButton}></span>
          {this.props.todo.description}
          <button type="button" className="close div-todo-close" onClick={this.onClickCloseButton}>&times;</button>
        </div>
      </div>
    );
  }
}

export default TodoListItem;