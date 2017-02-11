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
  todos: TodoItem[] = [];

  filterStatus;

  constructor(private http: Http) {
  }

  private getRequestOptions() {
    const requestHeaders = new Headers({ 'Accept': 'application/json' });
    requestHeaders.append('authorization', 'token 72193839-cd75-4de0-b1bb-cf5087e483db');
    const requestOptions = new RequestOptions({ headers: requestHeaders });
    return requestOptions;
  }

  private updateTodos (){
this.http
      .post('/me/todos/', this.todos, this.getRequestOptions())
      .map(response => response.json())
      .subscribe(todoItems => {
        this.todos = todoItems;
      });
  }

  ngOnInit() {
    this.filterStatus = 'All';
    this.http
      .get('/me/todos', this.getRequestOptions())
      .map(response => response.json())
      .subscribe(todoItems => {
        this.todos = todoItems;
      });
  }

  addTodo() {
    const newTodoItem = { id: Math.max(...this.todos.map(todo => todo.id)) + 1, todoText: this.todoText, done: false };
    this.todos.push(newTodoItem);
    this.todoText = '';
    this.updateTodos();
  }

  doneTodo(todoItem: TodoItem) {
    todoItem.done = !todoItem.done;
    this.updateTodos();
  }

  clearCompletedTodo() {
    this.todos = this.todos.filter(todo => !todo.done);
    this.updateTodos();
  }

  filterTodoStatus(status) {
    this.filterStatus = status;
  }

  completeAll() {
    this.todos.forEach(todo => {
      todo.done = true;
    });
    this.updateTodos();
  }

  deleteTodo(item: TodoItem) {
    this.todos.splice(this.todos.indexOf(item), 1);
    this.updateTodos();
  }
}
