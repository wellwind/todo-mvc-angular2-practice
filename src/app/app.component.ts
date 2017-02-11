import { TodoItem } from './todo-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done?';

  todoText;
  todos: TodoItem[];

  filterStatus;

  ngOnInit() {
    this.filterStatus = 'All';
    this.todos = [];
  }

  addTodo() {
    this.todos.push({ todoText: this.todoText, done: false });
    this.todoText = '';

    console.log(this.todos);
  }

  doneTodo(todoItem: TodoItem) {
    todoItem.done = !todoItem.done;
  }

  clearCompletedTodo() {
    this.todos = this.todos.filter(todo => !todo.done);
  }

  filterTodoStatus(status) {
    this.filterStatus = status;
  }

  completeAll() {
    this.todos.forEach(todo => {
      todo.done = true;
    });
  }

}
