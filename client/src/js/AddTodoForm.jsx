import React from 'react';

class AddTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.todoDescription.focus();
  }
  onSubmit(event) {
    event.preventDefault();

    if (this.refs.todoDescription.value) {
      this.props.addTodo({ description: this.refs.todoDescription.value });
      this.refs.form.reset();
    }
  }
  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="todoDescription" className="form-control" placeholder="new todo ..." />
        <button type="submit" className="btn btn-default buttom-add">Add</button>
      </form>
    );
  }
}

export default AddTodoForm;