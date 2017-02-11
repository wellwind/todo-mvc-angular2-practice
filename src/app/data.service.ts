import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { TodoItem } from './todo-item';

@Injectable()
export class DataService {

  requestUrl = '/me/todos';

  constructor(private http: Http) { }


  private getRequestOptions() {
    const requestHeaders = new Headers({ 'Accept': 'application/json' });
    requestHeaders.append('authorization', 'token 72193839-cd75-4de0-b1bb-cf5087e483db');
    const requestOptions = new RequestOptions({ headers: requestHeaders });
    return requestOptions;
  }

  loadTodos(): Observable<TodoItem[]> {
    return this.http
      .get(this.requestUrl, this.getRequestOptions())
      .map(response => response.json());
  }

  updateTodos(todos: TodoItem[]) {
    return this.http
      .post('/me/todos/', todos, this.getRequestOptions())
      .map(response => response.json());
  }
}
