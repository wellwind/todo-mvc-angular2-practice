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

  ngOnInit() {
    this.todos = [];
  }

  addTodo() {
    this.todos.push({ todoText: this.todoText, done: false });
    console.log(this.todos);
  }

  doneTodo(todoItem: TodoItem) {
    todoItem.done = !todoItem.done;
  }
}
