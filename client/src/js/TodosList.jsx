import React from 'react';
import TodoListItem from './TodoListItem.jsx';

const TodosList = props => (
  <div className="div-todosList"> 
    {props.todosList.map((todo, idx) => <TodoListItem key={idx} index={idx} todo={todo} deleteTodo={props.deleteTodo} markTodoDone={props.markTodoDone}></TodoListItem>)}
  </div>
);


export default TodosList;