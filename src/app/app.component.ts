import { Http, Headers, RequestOptions } from '@angular/http';
import { TodoItem } from './todo-item';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done?';

  todoText;
  todos;

  filterStatus;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.filterStatus = 'All';

    const requestHeaders = new Headers({ 'Accept': 'application/json' });
    requestHeaders.append('authorization', 'token 72193839-cd75-4de0-b1bb-cf5087e483db');
    const requestOptions = new RequestOptions({ headers: requestHeaders });
    this.todos = this.http
      .get('/me/todos', requestOptions)
      .map(response => response.json());
  }

  addTodo() {
    // this.todos.push({ id: this.todos.length + 1, todoText: this.todoText, done: false });
    this.todoText = '';

    console.log(this.todos);
  }

  doneTodo(todoItem: TodoItem) {
    todoItem.done = !todoItem.done;
  }

  clearCompletedTodo() {
    // this.todos = this.todos.filter(todo => !todo.done);
  }

  filterTodoStatus(status) {
    this.filterStatus = status;
  }

  completeAll() {
    // this.todos.forEach(todo => {
    //   todo.done = true;
    // });
  }

  deleteTodo(item: TodoItem) {
    // this.todos.splice(this.todos.indexOf(item), 1);
  }
}
